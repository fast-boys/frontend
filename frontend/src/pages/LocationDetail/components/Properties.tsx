import { LocationDetailPropertiesType } from "../type"
import PropertyItem from "./PropertyItem"
import { keyToString } from "../util"

interface PropertiesProps {
    address: string;
    properties: LocationDetailPropertiesType;
}

const Properties = ({address, properties}:PropertiesProps) => {
    return (
        <div className="mt-4 mb-5">
            <PropertyItem key="address" title="주소" content={address}/>
            {Object.entries(properties).map(([key, value]) => {
                if (value && key !== "location" && key !== "category") {
                    return <PropertyItem key={key} title={keyToString(key)} content={value} />
                }
                return null
            })}
        </div>
    )
}

export default Properties