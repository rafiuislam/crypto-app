import React from "react";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import { Col, Row, Typography, Avatar, Collapse, Space, Divider } from "antd";
import { useGetExchangesQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const { data, isFetching } = useGetExchangesQuery();
    const exchanges = data?.data?.exchanges;

    if (isFetching) return <Loader />;

    return (
        <>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            <Row>
                {exchanges?.map((exchange) => (
                    <Col span={24}>
                        <Collapse>
                            <Panel
                                key={exchange.id}
                                showArrow={false}
                                header={
                                    <div
                                        key={exchange.id}
                                        style={{
                                            display: "flex",
                                            flex: 4,
                                            justifyContent: "space-between",
                                            width: "100%",
                                        }}
                                    >
                                        <div
                                            style={{
                                                flex: 1,
                                            }}
                                        >
                                            <div>
                                                <Text>
                                                    <strong>
                                                        {exchange.rank}.
                                                    </strong>
                                                </Text>
                                                <Avatar
                                                    className="exchange-image"
                                                    src={exchange.iconUrl}
                                                />
                                                <Text>
                                                    <strong>
                                                        {exchange.name}
                                                    </strong>
                                                </Text>
                                            </div>
                                        </div>

                                        <div
                                            style={{
                                                flex: 1,
                                            }}
                                        >
                                            $ {millify(exchange.volume)}
                                        </div>
                                        <div
                                            style={{
                                                flex: 1,
                                            }}
                                        >
                                            {millify(exchange.numberOfMarkets)}
                                        </div>
                                        <div
                                            style={{
                                                flex: 1,
                                            }}
                                        >
                                            {millify(exchange.marketShare)}%
                                        </div>
                                    </div>
                                }
                            >
                                {HTMLReactParser(
                                    exchange.description ||
                                        "Sorry info not available"
                                )}
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Exchanges;
