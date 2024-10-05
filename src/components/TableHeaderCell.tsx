import { OverlayTrigger, Tooltip } from "react-bootstrap";

function TableHeaderCell({ text, tooltip }: { text: string; tooltip: string }) {
  return <th>
    <OverlayTrigger placement="top" overlay={<Tooltip>{tooltip}</Tooltip>}>
      <span>{text}</span>
    </OverlayTrigger>
  </th>;
}


export default TableHeaderCell