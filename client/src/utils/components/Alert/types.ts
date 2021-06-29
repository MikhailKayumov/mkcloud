export type AlertProps = {
  type: 'error' | 'info';
  title: string;
  show: boolean;
  leaveIn?: number;
};
