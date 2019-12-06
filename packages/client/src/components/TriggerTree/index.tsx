import React, { Component } from 'react';
import { Tree } from 'antd';
import { flattenDeep } from 'lodash';

const { TreeNode } = Tree;

interface TreeItem {
  name: string;
  path: string;
  menu?: boolean;
  parent: any;
  routes?: TreeItem[];
}

interface TriggerTreeProps {
  data: TreeItem[];
  disabled?: boolean;
  onChange?: (val: string[]) => void;
}

interface TriggerTreeState {
  checkedKeys: string[];
}

const addParentPath = (data: TreeItem[], parent?: string) => {
  const result: any = [];
  data.forEach(item => {
    if (item.routes) {
      item.routes = addParentPath(item.routes, item.path);
    }
    result.push({
      parent,
      ...item,
    });
  });

  return result;
}

const filterChildrenPath = (data: TreeItem[], parent: string): string[] => {
  let findCurrent = (data: TreeItem[], key: string): any => {
    for (let i of data) {
      if (i.path === key) {
        return i;
      }

      if (i.routes) {
        let ri = findCurrent(i.routes, key);

        if (ri) {
          return ri;
        }
      }
    }
  }

  let countChildren = (data: TreeItem[]): any => {
    let result: any = [];

    data.forEach((item: TreeItem) => {
      result.push(item.path);
      if (item.routes) {
        result = countChildren(item.routes).concat(result);
      }
    });

    return result;
  }

  const current = findCurrent(data, parent);
  const children = countChildren([current]);

  return children;
}

export default class TriggerTree extends Component<TriggerTreeProps, TriggerTreeState> {
  static getDerivedStateFromProps(nextProps: any) {
    if ('value' in nextProps) {
      return {
        checkedKeys: nextProps.value || [],
      };
    }
    return null;
  }

  constructor(props: TriggerTreeProps) {
    super(props);
    this.state = {
      checkedKeys: [],
    };
  }

  renderTreeNodes = (data: TreeItem[]) => {
    const { checkedKeys } = this.state;
    return data.map(item => {
      const disabled = this.props.disabled || item.parent && !checkedKeys.includes(item.parent)
      if (item.routes) {
        return (
          <TreeNode
            title={item.name}
            key={item.path}
            dataRef={item}
            className="hawthorn-rbac-tree-parent"
            disabled={disabled}
          >
            {this.renderTreeNodes(item.routes)}
          </TreeNode>
        );
      }

      return (
        <TreeNode
          title={item.name}
          key={item.path}
          className={item.menu ? 'hawthorn-rbac-tree-parent' : 'hawthorn-rbac-tree-child'}
          disabled={disabled}
          {...item}
        />
      );
    });
  }

  handleOnCheck = ({ checked }: any, { node: { props } }: any) => {
    const { data } = this.props;
    const { checked: check, eventKey, path } = props;
    let checkedKeys = checked;
    if (check) {
      const parent = eventKey || path;
      const children = filterChildrenPath(data, parent);
      checkedKeys = checkedKeys.filter((i: string) => !children.includes(i));
    }

    if (!('value' in this.props)) {
      this.setState({ checkedKeys });
    }
    this.triggerChange(checkedKeys);
  };

  triggerChange = (changeValue: string[]) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changeValue);
    }
  }

  render() {
    const { checkedKeys } = this.state;
    const { data, disabled } = this.props;

    return (
      <Tree
        checkable
        checkStrictly
        className="hawthorn-rbac-tree"
        autoExpandParent={true}
        disabled={disabled}
        checkedKeys={checkedKeys}
        onCheck={this.handleOnCheck}
      >
        {this.renderTreeNodes(addParentPath(data))}
      </Tree>
    );
  }
}
