import {GenerateColumn, Table} from "./table";
import {model} from "./table/model.ts";
import {observer} from "mobx-react-lite";
import {useDisplayEvent} from "./display/model.ts";
import {SplitBillPromoModal} from "./promo";

export const App = observer(() => {

  useDisplayEvent()

  if(model.rows.length > 0) {
    return (
        <SplitBillPromoModal>
          <Table />
        </SplitBillPromoModal>
    )
  }

  return <GenerateColumn />
})
