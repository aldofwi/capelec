import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { BsFillExclamationOctagonFill } from 'react-icons/bs'
import { useStateContext } from '../../context/StateContext'

const Canceled = () => {

    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    // Dès que la page "success" est chargée, on exécute le nettoyage
    useEffect(() => {

        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);

    }, []);

  return (

    <div className="cancel-wrapper">
        <div className="cancel">
            <p className="icon">
                <BsFillExclamationOctagonFill />
            </p>
            <h2>A problem occured with your order !</h2>
            <p className="description">
                If you have any questions, please email
                <a href="mailto:order@example.com" className="email">
                    order@example.com
                </a>
            </p>
            <Link href="/">
                <button type="button" width="300px" className="btn">
                    Retry Shopping
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Canceled