import { styled } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import variables from "styles/variables.module.scss";
import "./DropDownMenu.scss"

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
    color: variables.maxWhite,
    backgroundColor: variables.grey80,
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
            backgroundColor: variables.grey70,
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
