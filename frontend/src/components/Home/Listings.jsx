import Card from "./Card";
import './Listings.css'

export default function Listings({listings}) {
    return (
        <div className="listings"> 
            <h4>Not sure where to ? Surf Beautiful Places Here</h4>
            <div className="cards-collection">
                {listings.map((listing) => {
                    return (
                        <div key={listing._id} className="card-div">
                            <Card listing={listing}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}