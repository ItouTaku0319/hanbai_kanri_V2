import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Chip, Typography, Box
} from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/syohin`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("商品データの取得に失敗しました", err));
  }, []);

  return (
    <Box sx={{ px: 3, py: 4, width: "100%" }}>
      {/* 見出し */}
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: "bold" }}
      >
        商品一覧
      </Typography>

      {/* テーブル（幅いっぱい） */}
      <TableContainer
        component={Paper}
        elevation={1}
        sx={{ width: "100%" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>商品コード</TableCell>
              <TableCell>商品名</TableCell>
              <TableCell align="right">価格</TableCell>
              <TableCell align="right">カテゴリー</TableCell>
              <TableCell>単位</TableCell>
              <TableCell>有効状態</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((p) => (
              <TableRow key={p.syohin_code} hover>
                <TableCell>{p.syohin_code}</TableCell>
                <TableCell>{p.syohin_name}</TableCell>
                <TableCell align="right">{p.price}</TableCell>
                <TableCell align="right">{p.category}</TableCell>
                <TableCell>{p.stock_unit}</TableCell>
                <TableCell>
                  <Chip
                    label={p.is_active ? "有効" : "無効"}
                    color={p.is_active ? "success" : "default"}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductList;
