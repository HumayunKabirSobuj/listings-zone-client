import LoginFormComponent from './LoginFormComponent';
import './StoryStyles.css';

export default {
  title: 'Example/LoginFormComponent',
  component: LoginFormComponent,
};

const Template = (args) => (
  <div className="rive-story-container-login">
    <LoginFormComponent {...args} />
  </div>
);

export const Primary = Template.bind({});
