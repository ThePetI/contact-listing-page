import { styled } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';

const DropDownMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      {...props}
    />
))(() => ({
  '& .MuiPaper-root': {
    borderRadius: 8,
    width: 219,
    color: "rgba(255, 255, 255, 1)",
    backgroundColor: "rgba(30, 30, 30, 1)",
    '& .MuiMenu-list': {
      padding: 0,
    },
    '& .MuiMenuItem-root': {
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "LexendDeca",
        letterSpacing: 1,
        padding: "11px 21px",
        '&:hover': {
            backgroundColor: "rgba(35, 35, 35, 1)",
          },
      '& svg': {
            width: 20,
            height: 20,
            marginRight: 10,
      },
    },
  },
}));

export default DropDownMenu;
