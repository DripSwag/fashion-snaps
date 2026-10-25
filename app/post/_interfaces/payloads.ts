export interface ImagePayload extends Payload {
  body: ImageBody;
}

export interface TextPayload extends Payload {
  body: TextBody;
}

export interface ShapePayload extends Payload {
  body: ShapeBody;
}

export interface Payload {
  component: string;
  body: PayloadBody;
}

interface PayloadBody {
  z: number;
  x: number;
  y: number;
  height: number;
  width: number;
}

interface TextBody extends PayloadBody {
  value: string;
  font: string;
  size: number;
}

interface ImageBody extends PayloadBody {
  image: File;
}

interface ShapeBody extends PayloadBody {
  color: string;
  type: string;
}
