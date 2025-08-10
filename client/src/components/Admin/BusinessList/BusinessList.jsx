import styles from './businessList.module.css';
import { BusinessListItem } from './BusinessListItem/BusinessListItem';

export const BusinessList = ({businesses,setBusinesses}) => { 
    return(
        <ul>
            {businesses.map(business=>{
                return <BusinessListItem setBusinesses={setBusinesses} key={business._id} item={business}/>
            })}
        </ul>
    )
}