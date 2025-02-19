import React, { useEffect, useState, useMemo } from "react";
import { createContext } from "react";
import axios from "axios";
const ArticleContext = createContext();
import { useAuth0 } from "@auth0/auth0-react";

function ArticleProvider(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const getArticles = useMemo(
    () => async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://sports-stack-backend-gzabcuapa2a8gafm.canadacentral-01.azurewebsites.net/api/v1/articles"
        );
        if (response) {
          setArticles(response.data.data.articles);
          setLoading(false);
        }
      } catch (e) {
        console.error("Error fetching data: ", e);
        setError(e);
      }
    },
    []
  );

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  return (
    <ArticleContext.Provider value={{ articles, loading, error }}>
      {props.children}
    </ArticleContext.Provider>
  );
}

export { ArticleProvider, ArticleContext };
