import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { navigationLinks } from '../../constants/navigationLinks';
import { INavigationLink } from '../../constants/navigationLinks';

function NavigatePanel() {
  return (
    <>
      <WrapperNavigatePanel>
        <TitleNavigatePanel>Hacker news</TitleNavigatePanel>
        {navigationLinks.map((link: INavigationLink, index: number) => (
          <div key={link.name}>
            <LinkNavigatePanel to={link.path}>{link.name}</LinkNavigatePanel>
            {index < navigationLinks.length - 1 && <SeparatorLink> | </SeparatorLink>}
          </div>
        ))}
      </WrapperNavigatePanel>
      <Outlet />
    </>
  );
}

export default NavigatePanel;

const WrapperNavigatePanel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 10px;
  font-size: 14px;
  background-color: aqua;
  padding: 15px;
`;

const TitleNavigatePanel = styled.h1`
  font-size: 16px;
  font-weight: bold;
  padding-right: 15px;
`;

const LinkNavigatePanel = styled(Link)`
  color: gray;
  text-decoration: none;
`;

const SeparatorLink = styled.span`
  margin: 0 8px;
`;
