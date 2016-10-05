import React, { PropTypes } from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import Section from 'grommet-udacity/components/Section';
import Article from 'grommet-udacity/components/Article';
import Heading from 'grommet-udacity/components/Heading';
import Paragraph from 'grommet-udacity/components/Paragraph';
import Box from 'grommet-udacity/components/Box';
import Button from 'grommet-udacity/components/Button';
import List from 'grommet-udacity/components/List';
import ListItem from 'grommet-udacity/components/ListItem';
import FormField from 'grommet-udacity/components/FormField';
import Footer from 'grommet-udacity/components/Footer';
import Menu from 'grommet-udacity/components/Menu';

const UserProfile = ({
  user,
  onEditBio,
  isEditing,
  bioInput,
  onSaveEdit,
  onClickToEdit,
  onCancel,
  onEditAvatar,
  avatarInput,
  onEditEmail,
  emailInput,
}) => (
  <Section className={styles.userProfile}>
    <Box
      justify="center"
      align="center"
      pad={{ horizontal: 'large', vertical: 'large' }}
    >
      <Article className={styles.panel}>
        <Heading tag="h2" align="center">
          {`Hello, ${user.name}!`}
        </Heading>
        <Section
          className={isEditing ? '' : styles.transformAvatar}
          pad={{ vertical: 'medium' }}
          align="center"
          justify="center"
        >
          {isEditing ?
            <Box size="medium" align="center">
              <FormField label="Edit Avatar URL">
                <input
                  className={`grommetux-text-input grommetux-input ${styles.input}`}
                  onChange={onEditAvatar}
                  value={avatarInput || user.avatar}
                  id="avatar-input"
                />
              </FormField>
            </Box>
          :
          <Box
            onClick={onClickToEdit}
          >
            <img
              className={styles.avatar}
              src={user.avatar ?
                user.avatar
              :
                'http://bit.ly/2dqCGdd'
              }
            />
          </Box>
          }
        </Section>
        <Section pad={{ vertical: 'medium' }} align="center" justify="center">
          {isEditing ?
            <Box size="medium" align="center">
              <FormField label="Edit Bio">
                <textarea onChange={onEditBio} value={bioInput || user.bio} id="bio-input" />
              </FormField>
            </Box>
          :
            <Box
              onClick={onClickToEdit}
            >
            <Paragraph className={styles.isButton}>
                {user.bio ? user.bio : 'Click to add a bio.'}
              </Paragraph>
            </Box>
          }
        </Section>
        <Section pad={{ vertical: 'medium' }} align="center" justify="center">
          {isEditing ?
            <Box size="medium" align="center">
              <FormField label="Edit Email">
                <input
                  className={`grommetux-text-input grommetux-input ${styles.input}`}
                  onChange={onEditEmail}
                  value={emailInput || user.email}
                  id="email-input"
                />
              </FormField>
            </Box>
          :
            <Box
              onClick={onClickToEdit}
            >
              <Heading
                className={styles.isButton}
                tag="h3"
                align="center"
              >
                {user.email}
              </Heading>
            </Box>
          }
        </Section>
        {isEditing &&
          <Footer align="center" justify="center">
            <Menu inline direction="row">
              <Button
                label="Save"
                style={{ marginTop: 10 }}
                onClick={onSaveEdit}
              />
              <Button
                label="Cancel"
                style={{ marginTop: 10 }}
                onClick={onCancel}
              />
            </Menu>
          </Footer>
        }
      </Article>
      <Article className={styles.panel}>
        <Section pad={{ vertical: 'medium' }} align="center" justify="center">
          <Heading tag="h2">
            Event History
          </Heading>
          {user.events && user.events.length > 0 ?
            <List>
              {user.events.map((item, i) =>
                <ListItem key={i}>
                  {item.name}
                </ListItem>
              )}
            </List>
          :
            <Box>
              <Heading tag="h3">
                No Events Created Yet
              </Heading>
              <Button label="Create One" href="/create-event" />
            </Box>
          }
        </Section>
      </Article>
    </Box>
  </Section>
);

UserProfile.propTypes = {
  onEditEmail: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  emailInput: PropTypes.string.isRequired,
  onEditBio: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
  onClickToEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onEditAvatar: PropTypes.func.isRequired,
  avatarInput: PropTypes.string,
};

export default cssModules(UserProfile, styles);