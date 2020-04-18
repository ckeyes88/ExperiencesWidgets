import { h, Component } from "preact";
import { ButtonLink } from "../Button/ButtonLink";
import { formatCurrency } from "../../../Utils/helpers";

export interface IAvailabilityListItemProps {
  item: any;
  index: number;
  shopUrl: string;
}
export interface Image {
  id: string;
  featured: boolean;
}
export interface ImageLink {
  _id: string;
  url: string;
  mimeType: string;
  bucketKey: string;
  bucket: string;
}
export class AvailabilityListItem extends Component<IAvailabilityListItemProps> {
  public render() {
    const { item, shopUrl, index } = this.props;

    if (index === 0) { console.log(item) }

    if (!item) {
      return;
    }

    let featuredImage: Image;
    if (item.images && Array.isArray(item.images) && item.images.length) {
      featuredImage = item.images.find((i: Image) => i.featured);

    }
    let imgSrc = "";
    if (item.imageLinks && Array.isArray(item.imageLinks) && item.imageLinks.length) {
      if (featuredImage && featuredImage.id) {
        const image = item.imageLinks.find((i: ImageLink) => i._id.toString() === featuredImage.id.toString());
        imgSrc = image.url;
      }
    }
    let cost: string = `$${item.ticketCost}`;
    if (item && item.ticketCost && item.money_format) {
      cost = formatCurrency(item.money_format, item.ticketCost);
    }

    return (
      <div className="Container Item">
        <div
          className="Item-Photo"
          style={{ backgroundImage: `url("${imgSrc}")` }}
        >
          <div className="Item-Date">
            {item.timeslot.formattedTimeslot.date}
          </div>
        </div>

        <div className="Item-Desc">
          <h3 className="Item-DescTitle">{item.name}</h3>
          <p className="Item-DescCost">{item.ticketCost ? `${cost}` : "Free"}</p>
        </div>

        <div>{item.startsAt}</div>

        <ButtonLink
          className="Item-GoTo"
          label={"Event Details"}
          href={`https://${shopUrl}/products/${item.handle}?select=${new Date(item.timeslot.startsAt).getTime() / 1000}`}
        />

      </div>
    );
  }
}