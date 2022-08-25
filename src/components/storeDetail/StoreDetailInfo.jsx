import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { RiFileList3Line, RiMapPinLine } from 'react-icons/ri';
import { TbArrowBearRight } from 'react-icons/tb';
import { BiHomeAlt, BiPhoneCall, BiTime } from 'react-icons/bi';
import React, { Fragment } from 'react';

const StoreDetailInfo = ({ storeInfo }) => {
    const { storeAddress, storeBizHourInfo, storeWay, storeTel, storeOptions, storeDescription } = storeInfo;
    const emptyMessage = '정보가 제공 되지 않았습니다.';
    const storeBizHourInfoArr = storeBizHourInfo ? storeBizHourInfo.split('|') : [emptyMessage];
    const storeOptionsArr = storeOptions
        ? storeOptions.map((optionObj) => {
              return optionObj.name;
          })
        : [emptyMessage];
    return (
        <List
            sx={{
                width: '100%',
            }}
        >
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <RiMapPinLine />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="위치" secondary={storeAddress} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <TbArrowBearRight />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="오시는 길" secondary={storeWay ? storeWay : emptyMessage} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <BiTime />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="영업 시간"
                    secondary={
                        <Fragment>
                            {storeBizHourInfoArr.map((storeBizHourInfoValue, storeBizHourInfoIndex) => {
                                return (
                                    <Fragment key={storeBizHourInfoIndex}>
                                        <Typography component="span" variant="body2" color="text.primary" />
                                        {storeBizHourInfoValue} <br />
                                    </Fragment>
                                );
                            })}
                        </Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <BiPhoneCall />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="전화 번호" secondary={storeTel ? storeTel : emptyMessage} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <BiHomeAlt />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="옵션" secondary={storeOptionsArr} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <RiFileList3Line />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="설명" secondary={storeDescription ? storeDescription : emptyMessage} />
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    );
};

export default StoreDetailInfo;
