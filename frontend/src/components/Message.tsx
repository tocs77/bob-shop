import React, { ReactNode } from 'react';
import { Alert } from 'react-bootstrap';

type VariantTypes = 'info' | 'error' | 'primary' | 'danger' | 'success';

const Message = ({ variant, children }: { variant: VariantTypes; children: ReactNode }) => {
  return <Alert variant={variant || 'info'}>{children}</Alert>;
};

export default Message;
