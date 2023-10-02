import './category-item.style.scss'

const CategoryItem = ({category}) => {

    //key ustawiać na mapie nie w środku komponentu
    //background image --> url string!!!
    
    const {title, imageUrl} = category;
    return (
        <div className='category-item-container'>
            <div className='background-image' style={{backgroundImage: `url(${imageUrl})`}}/>
            <div className='category-body-container'>
            <h2>{title}</h2>
            <p>Shop now</p>
            </div>
        </div>
    )
}

export default CategoryItem;

