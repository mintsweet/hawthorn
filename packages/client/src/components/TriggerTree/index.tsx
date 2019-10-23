import React, { Component } from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

interface TreeItem {
  name: string;
  path: string;
  routes?: TreeItem[];
}

interface TriggerTreeProps {
  data: TreeItem[];
  onChange?: (val: string[]) => void;
}

export default class TriggerTree extends Component<TriggerTreeProps> {
  static getDerivedStateFromProps(nextProps: any) {
    if ('value' in nextProps) {
      return {
        checkedKeys: nextProps.value || [],
      };
    }
  }

  state = {
    checkedKeys: [],
  };

  renderTreeNodes = (data: TreeItem[]) =>
    data.map(item => {
      if (item.routes) {
        return (
          <TreeNode title={item.name} key={item.path} dataRef={item}>
            {this.renderTreeNodes(item.routes)}
          </TreeNode>
        );
      }

      return <TreeNode title={item.name} key={item.path} {...item} />;
    });

  handleOnCheck = (checkedKeys: any) => {
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
    const { data } = this.props;

    return (
      <Tree
        checkable
        autoExpandParent={true}
        checkedKeys={checkedKeys}
        onCheck={this.handleOnCheck}
      >
        {this.renderTreeNodes(data)}
      </Tree>
    );
  }
}
