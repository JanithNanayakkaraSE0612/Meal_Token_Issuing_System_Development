import React from 'react'
import { Avatar } from 'antd';
import { Card, Space } from 'antd';
import { Button, Dropdown, Flex } from 'antd';
import '../App.css'
import {ShoppingCartOutlined, CheckCircleOutlined,DeleteOutlined,PlusSquareOutlined,MinusSquareOutlined} from '@ant-design/icons';
const { Meta } = Card;
const MealList = () => {
  return (
    <Space direction='vertical' size={2}>
   <div style={{backgroundColor:'#DFF9FB',width:1345}}>
    <div style={{position:'absolute'}}>
    <Card
    style={{
      width: 250,
      marginLeft:100,
      top:150
    }}
    cover={
      <img
        alt="example"
        src=""
      />
    }
    actions={[
      <MinusSquareOutlined key="minus"/>,
      <PlusSquareOutlined key="plus"/>,
      <Button type="added" style={{backgroundColor:'#F56A00',color:'white'}}>Added</Button>
    ]}
  >
    <Meta
      title="Vegetable Fried Rice"
    />
  </Card>
  <Card
    style={{
      width: 250,
      marginLeft:600,
      top:0
    }}
    cover={
      <img
        alt="example"
        src=""
      />
    }
    actions={[
      <MinusSquareOutlined key="minus"/>,
      <PlusSquareOutlined key="plus"/>,
      <Button type="added" style={{backgroundColor:'#F56A00',color:'white'}}>Added</Button>
    ]}
  >
    <Meta
      title="Vegetable Fried Rice"
    />
  </Card>
  <Card
    style={{
      width: 250,
      marginLeft:100,
      top:100
    }}
    cover={
      <img
        alt="example"
        src=""
      />
    }
    actions={[
      <MinusSquareOutlined key="minus"/>,
      <PlusSquareOutlined key="plus"/>,
      <Button type="added" style={{backgroundColor:'#F56A00',color:'white'}}>Added</Button>
    ]}
  >
    <Meta
      title="Vegetable Fried Rice"
    />
  </Card>
  <Card
    style={{
      width: 250,
      marginLeft:600,
      top:-50
    }}
    cover={
      <img
        alt="example"
        src=""
      />
    }
    actions={[
      <MinusSquareOutlined key="minus"/>,
      <PlusSquareOutlined key="plus"/>,
      <Button type="added" style={{backgroundColor:'#F56A00',color:'white'}}>Added</Button>
    ]}
  >
    <Meta
      title="Vegetable Fried Rice"
    />
  </Card>
  </div>
      <div style={{width:300,backgroundColor:'#DFF9FB',marginLeft:1000,marginTop:-150,}}>
        <Card
          style={{
              width: 300,
              marginTop:10,
              height:60,
              fontSize:20,
              backgroundColor:"green",
            }}
        >
          <ShoppingCartOutlined style={{marginLeft:20 ,fontSize:20,position:'absolute',color:'white'}}/> <div style={{color:'white',fontFamily:'-moz-initial',marginLeft:60,marginTop:-5}}>My Basket</div>
        </Card>
            <Card
                style={{
                width: 300,
                }}
              >
              <Avatar style={{ backgroundColor: '#F56A00',color: 'white',}}>2X</Avatar>
                <Meta
                    title="RS.800.00"
                    description="Chiken Kottu"
                    style={{
                      marginLeft:50,
                      marginTop: -40,
                      fontStyle:'initial'
                    }}
                  />
                <div>{<a href="#"> <DeleteOutlined style={{marginLeft:200,marginTop:-40,fontSize:20,position:'absolute',color:'black'}}/> </a>}</div>
              </Card>
            <Card
              style={{
                width: 300,
                }}
            >
              <Avatar style={{ backgroundColor: '#F56A00',color: 'white',}}>2X</Avatar>
              <Meta
                  title="RS.1400.00"
                  description="Coke Coca Coa"
                  style={{
                    marginLeft:50,
                    marginTop: -40,
                    fontStyle:'initial'
                  }}
                />
                <div>{<a href="#"> <DeleteOutlined style={{marginLeft:200,marginTop:-40,fontSize:20,position:'absolute',color:'red'}}/> </a>}</div>
            </Card>
            <Card
              style={{
                width: 300,
                }}
            >
              <Avatar style={{ backgroundColor: '#F56A00',color: 'white',}}>2X</Avatar>
              <Meta
                  title="RS.1400.00"
                  description="Vegetable Fried Rice"
                  style={{
                    marginLeft:50,
                    marginTop: -40,
                    fontStyle:'initial'
                  }}
                />
                <div>{<a href="#"> <DeleteOutlined style={{marginLeft:200,marginTop:-40,fontSize:20,position:'absolute'}}/> </a>}</div>
            </Card>
            <Card
              style={{
                width: 300,
                }}
            >
              <Meta
                  title="Sub Total :"
                  style={{
                    marginRight:50,
                    fontSize:30,
                    fontFamily:'sans-serif',
                  }}
                />
                <div style={{marginLeft:150,marginTop:-25}}>RS 3800.00</div>
                <Meta
                  title="Discounts :"
                  style={{
                    marginRight:50,
                    marginTop:10,
                    fontSize:30,
                    fontFamily:'sans-serif',
                  }}
                />
                <div style={{marginLeft:150,marginTop:-25}}>RS 300.00</div>
            </Card>
            <Card
              style={{
                width: 300,
                }}
            >
              <div style={{width:250,height:33,backgroundColor:'#F56A00',borderRadius:10}}><div style={{marginLeft:50,fontSize:18,color:'white'}}>Total to  Price</div></div>
            </Card>
            <Card
              style={{
                width: 300,
              }}
            >
              <div style={{width:230,height:43,backgroundColor:'green',borderRadius:10}}><div style={{fontSize:20, marginLeft:40,color:'white'}}><CheckCircleOutlined style={{fontSize:17,marginLeft:20,marginTop:15,color:'white',position:'relative'}}/>   Checkout !</div></div>
            </Card>
      </div>
      </div>
    </Space>
  )
}
export default MealList