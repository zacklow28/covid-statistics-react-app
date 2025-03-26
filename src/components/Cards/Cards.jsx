import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import styles from './Cards.module.css';
import CountUp from 'react-countup';

const Cards = ({data}) => {
  if (!data) {
    return <div></div>
  }

  return (
    <div className={styles.container}>
        <Grid container justifyContent="center">
            <Grid item component={Card} xs={12} md={3} className={styles.infected}>
                <CardContent>
                    <Typography color="textSecondary">Infected</Typography>
                    <Typography variant="h5">
                        <CountUp
                            start={0}
                            end={data.confirmed}
                            duration={2.5}
                            separator=","/>
                    </Typography>
                    <Typography color="textSecondary">Last Updated: <br/>{new Date(data.last_update).toDateString()}</Typography>
                    <Typography variant="body2">Number of infected cases of COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} className={styles.active}>
                <CardContent>
                    <Typography color="textSecondary">Active</Typography>
                    <Typography variant="h5">
                        <CountUp
                        start={0}
                        end={data.active}
                        duration={2.5}
                        separator=","/>
                    </Typography>
                    <Typography color="textSecondary">Last Updated: <br/>{new Date(data.last_update).toDateString()}</Typography>
                    <Typography variant="body2">Number of active cases from COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} className={styles.deaths}>
                <CardContent>
                    <Typography color="textSecondary">Deaths</Typography>
                    <Typography variant="h5">
                        <CountUp
                        start={0}
                        end={data.deaths}
                        duration={2.5}
                        separator=","/>
                    </Typography>
                    <Typography color="textSecondary">Last Updated: <br/>{new Date(data.last_update).toDateString()}</Typography>
                    <Typography variant="body2">Number of deaths from COVID-19</Typography>
                </CardContent>
            </Grid>
        </Grid>
    </div>
  );
};

export default Cards;