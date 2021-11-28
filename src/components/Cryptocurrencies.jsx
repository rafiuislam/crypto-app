import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Card, Row, Col, Input } from "antd";

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [search, setSearch] = useState("");

    console.log(cryptos);

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase())
        );
        setCryptos(filteredData);
    }, [search, cryptosList]);

    if (isFetching) return "Loading...";

    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input
                        placeholder="Search For Desired Cryptocurrency"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((currency, index) => (
                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                        className="crypto-card"
                        key={index}
                    >
                        <Link to={`/crypto/${currency.id}`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={
                                    <img
                                        className="crypto-image"
                                        src={currency.iconUrl}
                                    />
                                }
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Cryptocurrencies;
