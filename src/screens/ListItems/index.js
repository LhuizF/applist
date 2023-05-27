import React, { useState, useEffect } from "react";
import { Container } from '../../components/Templates/container';
import { ListItemsHeader } from '../../components/Atoms/ListItemsHeader';
import { TableItems } from "../../components/Organisms/TableItems";
import colors from "../../theme/colors";

export const ListItems = ({ navigation, route }) => {
  const { list } = route.params
  return (
    <Container color={colors.gray} >
      <ListItemsHeader title={list.name} />
      <TableItems items={list.items} />
    </Container>
  );
}

