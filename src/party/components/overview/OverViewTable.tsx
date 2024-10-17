import "./OverViewTable.scss"
import {OverviewItem, useOverviewItems} from "./useOverviewItems.ts";
import {Guest} from "../guests-list/guest/GuestComponent.tsx";

type OverviewItemProps = OverviewItem;

const OverviewItemComponent = ({title, value}: OverviewItemProps) => {
  return (
    <div className="overview-item">
      <div className="item-title">{title}:</div>
      <div className="item-value">{value}</div>
    </div>
  )
}
interface OverViewTableProps {
  guests: Array<Guest>;
}

const OverViewTable = ({guests}: OverViewTableProps) => {
  const overviewItems = useOverviewItems(guests)

  return (
    <div className="overview">
      <h2 className="overviewLabel">Overview:</h2>
      <div className="overviewContainer">
        <div className="wrapper">
          {overviewItems.map((item) => (
            <OverviewItemComponent key={item.title} {...item}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverViewTable;