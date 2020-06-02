import React from 'react';
import { useIntl, FormattedMessage } from 'umi';
import moment from 'moment';
import { Modal, Row, Col, Tag, Badge } from 'antd';

interface Props {
  visible: boolean;
  data: any;
  onCancel: () => void;
}

export const renderUrl = (url: string) => <Tag color="cyan">{url}</Tag>;

export const renderMethod = (method: string) => {
  const METHOD_MAP: any = {
    POST: 'green',
    DELETE: 'red',
    PUT: 'orange',
    GET: 'blue',
  };

  return <Tag color={METHOD_MAP[method]}>{method}</Tag>;
};

export const renderCode = (code: number, noIcon = false) => {
  if (code === 0) {
    return noIcon ? (
      <span style={{ color: '#52c41a' }}>
        <FormattedMessage id="page.audit-log.code.success" />
      </span>
    ) : (
      <Badge
        status="success"
        text={<FormattedMessage id="page.audit-log.code.success" />}
      />
    );
  }

  return noIcon ? (
    <span style={{ color: '#ff4d4f' }}>
      <FormattedMessage id="page.audit-log.code.failed" />
    </span>
  ) : (
    <Badge
      status="error"
      text={<FormattedMessage id="page.audit-log.code.failed" />}
    />
  );
};
export default function Detail({ visible, data, onCancel }: Props) {
  const { formatMessage } = useIntl();

  return (
    <Modal visible={visible} title="日志详情" footer={null} onCancel={onCancel}>
      <Row style={{ marginBottom: 16 }}>
        <Col span={6} style={{ textAlign: 'right' }}>
          {formatMessage({ id: 'page.audit-log.createdAt' })}：
        </Col>
        <Col span={18}>{moment(data.createdAt).format('YYYY-MM-DD')}</Col>
      </Row>
      <Row style={{ marginBottom: 16 }}>
        <Col span={6} style={{ textAlign: 'right' }}>
          {formatMessage({ id: 'page.audit-log.ip' })}：
        </Col>
        <Col span={18}>{data.ip}</Col>
      </Row>
      <Row style={{ marginBottom: 16 }}>
        <Col span={6} style={{ textAlign: 'right' }}>
          {formatMessage({ id: 'page.audit-log.username' })}：
        </Col>
        <Col span={18}>{data.username}</Col>
      </Row>
      <Row style={{ marginBottom: 16 }}>
        <Col span={6} style={{ textAlign: 'right' }}>
          {formatMessage({ id: 'page.audit-log.url' })}：
        </Col>
        <Col span={18}>{renderUrl(data.url)}</Col>
      </Row>
      <Row style={{ marginBottom: 16 }}>
        <Col span={6} style={{ textAlign: 'right' }}>
          {formatMessage({ id: 'page.audit-log.method' })}：
        </Col>
        <Col span={18}>{renderMethod(data.method)}</Col>
      </Row>
      <Row style={{ marginBottom: 16 }}>
        <Col span={6} style={{ textAlign: 'right' }}>
          {formatMessage({ id: 'page.audit-log.ua' })}：
        </Col>
        <Col span={18}>{data.ua}</Col>
      </Row>
      <Row style={{ marginBottom: 16 }}>
        <Col span={6} style={{ textAlign: 'right' }}>
          {formatMessage({ id: 'page.audit-log.operationType' })}：
        </Col>
        <Col span={18}>{data.operationType}</Col>
      </Row>
      <Row style={{ marginBottom: 16 }}>
        <Col span={6} style={{ textAlign: 'right' }}>
          {formatMessage({ id: 'page.audit-log.operationContent' })}：
        </Col>
        <Col span={18}>{data.operationContent}</Col>
      </Row>
      <Row style={{ marginBottom: 16 }}>
        <Col span={6} style={{ textAlign: 'right' }}>
          {formatMessage({ id: 'page.audit-log.code' })}：
        </Col>
        <Col span={18}>{renderCode(data.code, true)}</Col>
      </Row>
      <Row style={{ marginBottom: 16 }}>
        <Col span={6} style={{ textAlign: 'right' }}>
          {formatMessage({ id: 'page.audit-log.msg' })}：
        </Col>
        <Col span={18}>{data.msg}</Col>
      </Row>
      <Row style={{ marginBottom: 16 }}>
        <Col span={6} style={{ textAlign: 'right' }}>
          {formatMessage({ id: 'page.audit-log.data' })}：
        </Col>
        <Col span={18}>{JSON.stringify(data.data)}</Col>
      </Row>
    </Modal>
  );
}
