import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <Menu style={{ marginTop: '10px' }}>
            <Menu.Item as={Link} to='/'>
                KickStart
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item as={Link} to='/'>
                    Campaigns
                </Menu.Item>
                <Menu.Item as={Link} to='/campaigns/new'>
                    +
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};