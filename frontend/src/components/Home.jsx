import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
<Box sx={{ px: 4, py: 3 }}>
  <Typography variant="h4" gutterBottom>ホーム</Typography>
  <Typography variant="body1">
    ようこそ！ここにダッシュボードや最近の更新情報などを表示できます。
  </Typography>
</Box>

  );
};

export default Home;
