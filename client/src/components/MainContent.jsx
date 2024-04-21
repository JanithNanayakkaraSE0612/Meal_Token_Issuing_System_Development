import React from 'react';
import {Flex} from "antd";
import { Col, Row } from 'antd';


const MainContent = () => {

    return(
        <div className="wrapper" style={{width: '150%'}} >
            <div className="cards"  >

                <div className=" card [ is-collapsed ] " >
                    <div className="card__inner [ js-expander ]">
                        <span>Card</span>
                        <i className="fa fa-folder-o"></i>
                    </div>
                    <div className="card__expander">
                        <i className="fa fa-close [ js-collapser ]"></i>
                        Expander
                    </div>
                </div>

                <div className=" card [ is-collapsed ] ">
                    <div className="card__inner [ js-expander ]">
                        <span>Card</span>
                        <i className="fa fa-folder-o"></i>
                    </div>
                    <div className="card__expander">
                        <i className="fa fa-close [ js-collapser ]"></i>
                        Expander
                    </div>
                </div>

                <div className=" card [ is-collapsed ] ">
                    <div className="card__inner [ js-expander ]">
                        <span>Card</span>
                        <i className="fa fa-folder-o"></i>
                    </div>
                    <div className="card__expander">
                        <i className="fa fa-close [ js-collapser ]"></i>
                        Expander
                    </div>
                </div>

            </div>

        </div>

    );
};

export default MainContent;