const InfoCard = ({title, data}) => {
    return (
        <div className='ml-6 mt-4'>
            <p className='font-bold text-lg'>{title}</p>
            <p className='ml-6 font-medium'>{data}</p>  
        </div>
    )
}

export default InfoCard