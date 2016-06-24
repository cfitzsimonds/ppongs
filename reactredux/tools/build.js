import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import colors from 'colors';

process.env.NODE_ENV = 'production';

console.log('generating minified bundle for production via webpack'.blue);

webpack(webpackConfig).run((err, stats) => {
  if (err){
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors){
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if(jsonStats.hasWarnings){
    console.log('Webpack made these warnings'.bold.yellow);
    jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  console.log(`webpack stats: ${stats}`);

  console.log('app has been compiled in produciton mode and written to dis. ready to roll'.green);
  return 0;

});
