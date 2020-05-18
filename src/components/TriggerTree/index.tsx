import React from 'react';
import { Tree } from 'antd';

interface Value {
  checked: string[];
  halfChecked: string[];
}

interface Props {
  data: any;
  value?: Value;
  onChange?: (val: Value) => void;
}

export default function TriggerTree({ data, value, onChange }: Props) {
  const onCheck = (checked: any, { halfCheckedKeys: halfChecked }: any) => {
    if (onChange) {
      onChange({ checked, halfChecked });
    }
  };

  return (
    <Tree
      checkable
      checkedKeys={value?.checked || []}
      onCheck={onCheck}
      treeData={data}
    />
  );
}
