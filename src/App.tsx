import * as stylex from '@stylexjs/stylex';

const gap = '24px';
const headerHeight = '200px';

const styles = stylex.create({
  container: {
    backgroundColor: 'black',
    padding: gap,
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap,
    position: 'relative',
  },
  header: {
    height: headerHeight,
    position: 'sticky',
    top: 0,
  },
  screenHeight: {
    height: `calc(100vh - ${headerHeight} - ${gap} * 2)`,
  },
  border: {
    border: '1px solid blue',
  },
});

function App() {
  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.header, styles.border)}>HEADER</div>
      <div {...stylex.props(styles.screenHeight, styles.border)}>HERO</div>
      <div {...stylex.props(styles.screenHeight, styles.border)}>SKILLS</div>
    </div>
  );
}

export default App;
