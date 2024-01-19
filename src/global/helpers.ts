export function throwFalsey(props: { status: boolean; message: string }) {
  if (props.status === false) throw new Error(props.message);
}
