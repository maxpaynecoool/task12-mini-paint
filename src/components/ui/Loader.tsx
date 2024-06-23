import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export const Loader = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
    </div>
  );
};
