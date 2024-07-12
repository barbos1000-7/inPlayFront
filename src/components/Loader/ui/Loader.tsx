
import {FC} from 'react';
import './Loader.css'
interface LoaderProps {
    height?: number;
    width?: number;
}

 const Loader: FC<LoaderProps> = ({width = 200, height = 200}) => {
    return (
        <div className={'wrapper'}>
            <img src={'/close.svg'} alt="Загрузка..." width={width} height={height} />
        </div>
    );
};


export default Loader