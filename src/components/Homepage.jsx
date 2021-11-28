import React from "react";
import { Typography, Row, Col, Statistic } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";

const { Title } = Typography;
const Homepage = () => {
    return (
        <>
            <Title level={3} className="heading">
                Global Crypto Stats
            </Title>
            <Row>
                <Col span={12}>
                    <Statistic
                        title="Total Cryptocurrencies"
                        value="5"
                    ></Statistic>
                </Col>
                <Col span={12}>
                    <Statistic title="Total Exchanges" value="5"></Statistic>
                </Col>
                <Col span={12}>
                    <Statistic title="Total Market Gap" value="5"></Statistic>
                </Col>
                <Col span={12}>
                    <Statistic title="Total 24h Volume" value="5"></Statistic>
                </Col>
                <Col span={12}>
                    <Statistic title="Total Markets" value="5"></Statistic>
                </Col>
            </Row>
        </>
    );
};

export default Homepage;
