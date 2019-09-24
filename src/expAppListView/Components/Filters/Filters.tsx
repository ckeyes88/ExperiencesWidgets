import { h, Component } from 'preact';

export type SortByTypes =
    | 'date'
    | 'name';

export interface IFiltersProps {
    productsQuantity: number;
    onSortChange: any;
    sortBy: SortByTypes;
}

export class Filters extends Component<IFiltersProps> {
    public render(props: IFiltersProps) {

        return (
            <div className='Filters'>
                <div className='Container Filters-Container'>
                    <div>Sort by:
                        <select className='Filters-SortBy' id="lang" onChange={props.onSortChange} value={props.sortBy}>
                            <option value="date">Date</option>
                            <option value="name">Name</option>
                        </select>
                    </div>

                    <div>{`${props.productsQuantity} product${props.productsQuantity>1 ? 's' : ''}`}</div>
                </div>
            </div>
        );
    }
}