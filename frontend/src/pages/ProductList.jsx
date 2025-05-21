// src/pages/ProductList.jsx
import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
	fetch(`${import.meta.env.VITE_API_BASE_URL}/syohin`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("商品データの取得に失敗しました", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>商品一覧</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={th}>商品コード</th>
            <th style={th}>商品名</th>
            <th style={th}>価格</th>
            <th style={th}>カテゴリー</th>
            <th style={th}>単位</th>
            <th style={th}>有効状態</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.syohin_code}>
              <td style={td}>{p.syohin_code}</td>
              <td style={td}>{p.syohin_name}</td>
              <td style={td}>{p.price}</td>
              <td style={td}>{p.category}</td>
              <td style={td}>{p.stock_unit}</td>
              <td style={td}>{p.is_active ? "有効" : "無効"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const th = {
  borderBottom: "2px solid #ccc",
  padding: "0.5rem",
  textAlign: "left",
  backgroundColor: "#f2f2f2",
};

const td = {
  borderBottom: "1px solid #eee",
  padding: "0.5rem",
};

export default ProductList;
