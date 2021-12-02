import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HTMLReactparser from "html-react-parser";
import millify from "millify";
import { Typography, Select, Row, Col, Avatar, Card } from "antd";
import {
    HomeOutlined,
    FundOutlined,
    MoneyCollectOutlined,
    BulbOutlined,
    MenuOutlined,
    DollarCircleOutlined,
    NumberOutlined,
    ThunderboltOutlined,
    TrophyOutlined,
    CheckOutlined,
    StopOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import LineChart from "./LineChart";
import Loader from "./Loader";

const { Option } = Select;
const { Text, Title } = Typography;

const CryptoDetails = () => {
    const { coinId } = useParams();
    const [period, setPeriod] = useState("24h");
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({
        coinId,
        period,
    });
    const cryptoDetails = data?.data?.coin;
    console.log(coinHistory);

    if (isFetching) return <Loader />;

    const time = ["24h", "7d", "30d", "1y", "3m", "3y", "5y"];

    const stats = [
        {
            title: "Price to USD",
            value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
            icon: <DollarCircleOutlined />,
        },
        { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
        {
            title: "24h Volume",
            value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
            icon: <ThunderboltOutlined />,
        },
        {
            title: "Market Cap",
            value: `$ ${
                cryptoDetails.marketCap && millify(cryptoDetails.marketCap)
            }`,
            icon: <DollarCircleOutlined />,
        },
        {
            title: "All-time-high(daily avg.)",
            value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
            icon: <TrophyOutlined />,
        },
    ];

    const genericStats = [
        {
            title: "Number Of Markets",
            value: cryptoDetails.numberOfMarkets,
            icon: <FundOutlined />,
        },
        {
            title: "Number Of Exchanges",
            value: cryptoDetails.numberOfExchanges,
            icon: <MoneyCollectOutlined />,
        },
        {
            title: "Aprroved Supply",
            value: cryptoDetails.approvedSupply ? (
                <CheckOutlined />
            ) : (
                <StopOutlined />
            ),
            icon: <ExclamationCircleOutlined />,
        },
        {
            title: "Total Supply",
            value: `$ ${millify(cryptoDetails.totalSupply)}`,
            icon: <ExclamationCircleOutlined />,
        },
        {
            title: "Circulating Supply",
            value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
            icon: <ExclamationCircleOutlined />,
        },
    ];
    return (
        <Col className="coin-detail-container">
            <Col className="coin-heading-container">
                <Title level={2} className="coin-name">
                    {cryptoDetails.name} ({cryptoDetails.slug}) price
                </Title>
                <p>{cryptoDetails.name} live price in Dollars</p>
            </Col>
            <Select
                defaultValue={period}
                className="select-timeperiod"
                placeholder="Select a time period"
                onChange={(value) => setPeriod(value)}
            >
                {time.map((date, index) => (
                    <Option key={index} value={date}>
                        {date}
                    </Option>
                ))}
            </Select>
            {/* Chart */}
            <LineChart
                coinHistory={coinHistory}
                currentPrice={millify(cryptoDetails.price)}
                coinName={cryptoDetails.name}
            />
            <Col className="stats-container">
                <Col className="coin-value-statistics">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">
                            {cryptoDetails.name} Value Statistics
                        </Title>
                        <p>
                            An overview that shows the stats of
                            {cryptoDetails.name}
                        </p>
                    </Col>
                    {stats.map(({ icon, title, value }) => (
                        <Col className="coin-stats">
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
                <Col className="other-stats-info">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">
                            Others Value Statistics
                        </Title>
                        <p>
                            An overview that shows the stats of Cryptocurrency.
                        </p>
                    </Col>
                    {genericStats.map(({ icon, title, value }, index) => (
                        <Col className="coin-stats">
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className="coin-desc-link">
                <Row className="coin-desc">
                    <Title level={3} className="coin-details-heading">
                        What is {cryptoDetails.name}
                    </Title>
                    {HTMLReactparser(cryptoDetails.description)}
                </Row>
                <Col className="coin-links">
                    <Title level={3} className="coin-details-heading">
                        {cryptoDetails.name} Links
                    </Title>
                    {cryptoDetails.links.map((link, index) => (
                        <Row className="coin-link" key={index}>
                            <Title level={4} className="link-name">
                                {link.type}
                            </Title>
                            <a href={link.url} target="_blank" rel="noreferrer">
                                {link.name}
                            </a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    );
};

export default CryptoDetails;
