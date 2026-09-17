export interface TextPayload {
  component: string;
  body: {
    x: number;
    y: number;
    height: number;
    width: number;
    value: string;
  };
}
