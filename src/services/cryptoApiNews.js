import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiNewsHeaders = {
    "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
    "x-rapidapi-key": "99793afc85msh9294e201451198bp1a28e8jsnd436c13e4efd",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoApiNewsHeaders });

export const cryptoApiNews = createApi({
    reducerPath: "cryptoApiNews",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) =>
                createRequest(
                    `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
                ),
        }),
    }),
});

export const { useGetCryptoNewsQuery } = cryptoApiNews;
