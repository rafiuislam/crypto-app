import React, { useState } from "react";
import moment, { max } from "moment";
import { Typography, Select, Row, Col, Avatar, Card } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoApiNews";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Text, Title } = Typography;
const { Option } = Select;
const demo = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
    const count = simplified ? 3 : 20;
    const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
    const { data: cryptoNews } = useGetCryptoNewsQuery({
        newsCategory,
        count,
    });
    const { data } = useGetCryptosQuery(100);

    if (!cryptoNews?.value) return "Loading...";

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) =>
                            option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins.map((coin) => (
                            <Option value={coin.name}>{coin.name}</Option>
                        ))}
                    </Select>
                </Col>
            )}

            {cryptoNews.value.map((news, index) => (
                <Col key={index} xs={24} sm={12} lg={8}>
                    <Card className="news-card" hoverable>
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title level={4} className="news-title">
                                    {news.name}
                                </Title>
                                <img
                                    style={{
                                        maxWidth: "150px",
                                        maxHeight: "100px",
                                        borderRadius: "5px",
                                    }}
                                    src={
                                        news?.image?.thumbnail?.contentUrl ||
                                        demo
                                    }
                                    alt="news"
                                />
                            </div>
                            <p>
                                {news.description > 100
                                    ? `${news.description.substring(0, 100)}...`
                                    : news.description}
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar
                                        src={
                                            news.provider[0]?.image?.thumbnail
                                                ?.contentUrl || demo
                                        }
                                        alt=""
                                    />
                                    <Text className="provider-name">
                                        {news.provider[0].name}
                                    </Text>
                                </div>
                                <Text>
                                    {moment(news.datePublished)
                                        .startOf("ss")
                                        .fromNow()}
                                </Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default News;
