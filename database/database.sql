
alter table BLOOD_REQUEST 
   drop foreign key FK_BLOOD_RE_RELATIONS_RECIPIEN;

alter table BLOOD_TEST 
   drop foreign key FK_BLOOD_TE_RELATIONS_DONATION;

alter table DONATION 
   drop foreign key FK_DONATION_RELATIONS_DONATION;

alter table DONATION_REGISTRATION 
   drop foreign key FK_DONATION_RELATIONS_DONOR;

alter table DONATION_REGISTRATION 
   drop foreign key FK_DONATION_RELATIONS_EVENT;

alter table DONOR 
   drop foreign key FK_DONOR_RELATIONS_USER;

alter table `MATCH` 
   drop foreign key FK_MATCH_RELATIONS_DONOR;

alter table `MATCH` 
   drop foreign key FK_MATCH_RELATIONS_BLOOD_RE;

alter table NOTIFICATION 
   drop foreign key FK_NOTIFICA_RELATIONS_USER;

alter table RECIPIENT 
   drop foreign key FK_RECIPIEN_RELATIONS_USER;

alter table REPORT 
   drop foreign key FK_REPORT_RELATIONS_USER;

alter table USER_ROLE 
   drop foreign key FK_USER_ROL_RELATIONS_USER;

alter table USER_ROLE 
   drop foreign key FK_USER_ROL_RELATIONS_ROLE;


alter table BLOOD_REQUEST 
   drop foreign key FK_BLOOD_RE_RELATIONS_RECIPIEN;

drop table if exists BLOOD_REQUEST;


alter table BLOOD_TEST 
   drop foreign key FK_BLOOD_TE_RELATIONS_DONATION;

drop table if exists BLOOD_TEST;


alter table DONATION 
   drop foreign key FK_DONATION_RELATIONS_DONATION;

drop table if exists DONATION;

drop table if exists DONATION_EVENT;


alter table DONATION_REGISTRATION 
   drop foreign key FK_DONATION_RELATIONS_EVENT;

alter table DONATION_REGISTRATION 
   drop foreign key FK_DONATION_RELATIONS_DONOR;

drop table if exists DONATION_REGISTRATION;


alter table DONOR 
   drop foreign key FK_DONOR_RELATIONS_USER;

drop table if exists DONOR;


alter table `MATCH` 
   drop foreign key FK_MATCH_RELATIONS_DONOR;

alter table `MATCH` 
   drop foreign key FK_MATCH_RELATIONS_BLOOD_RE;

drop table if exists `MATCH`;


alter table NOTIFICATION 
   drop foreign key FK_NOTIFICA_RELATIONS_USER;

drop table if exists NOTIFICATION;


alter table RECIPIENT 
   drop foreign key FK_RECIPIEN_RELATIONS_USER;

drop table if exists RECIPIENT;


alter table REPORT 
   drop foreign key FK_REPORT_RELATIONS_USER;

drop table if exists REPORT;

drop table if exists ROLE;

drop table if exists USER;


alter table USER_ROLE 
   drop foreign key FK_USER_ROL_RELATIONS_USER;

alter table USER_ROLE 
   drop foreign key FK_USER_ROL_RELATIONS_ROLE;

drop table if exists USER_ROLE;

/*==============================================================*/
/* Table: BLOOD_REQUEST                                         */
/*==============================================================*/
create table BLOOD_REQUEST
(
   REQUESTID            int not null  comment '',
   RECIPENTID           int not null  comment '',
   LOCATIONID           int  comment '',
   REQUESTEDVOLUME      decimal(6,2)  comment '',
   REASON               varchar(255)  comment '',
   PRIORITYLEVEL        varchar(20)  comment '',
   NEEDEDTIME           datetime  comment '',
   STATUS               varchar(30)  comment '',
   NOTES                varchar(255)  comment '',
   CREATEDDATE          datetime  comment '',
   UPDATEDDATE          datetime  comment '',
   primary key (REQUESTID)
);

/*==============================================================*/
/* Table: BLOOD_TEST                                            */
/*==============================================================*/
create table BLOOD_TEST
(
   DONATIONID           int not null  comment '',
   TESTID               int not null  comment '',
   HEMOGLOBIN           decimal(5,2)  comment '',
   HIV                  varchar(20)  comment '',
   HEPATITISB           varchar(20)  comment '',
   HEPATITISC           varchar(20)  comment '',
   SYPHILIS             varchar(20)  comment '',
   CONCLUSION           varchar(50)  comment '',
   TESTDATE             date  comment '',
   NOTES                varchar(255)  comment '',
   CREATEDDATE          datetime  comment '',
   UPDATEDDATE          datetime  comment '',
   primary key (TESTID)
);

/*==============================================================*/
/* Table: DONATION                                              */
/*==============================================================*/
create table DONATION
(
   DONATIONID           int not null  comment '',
   USERID               int not null  comment '',
   REGISTRATIONID       int not null  comment '',
   DONATIONDATE         date  comment '',
   VOLUME               decimal(6,2)  comment '',
   HEALTHSTATUS         varchar(50)  comment '',
   NOTES                varchar(255)  comment '',
   CREATEDDATE          datetime  comment '',
   UPDATEDDATE          datetime  comment '',
   primary key (DONATIONID)
);

/*==============================================================*/
/* Table: DONATION_EVENT                                        */
/*==============================================================*/
create table DONATION_EVENT
(
   EVENTID              int not null  comment '',
   EVENTNAME            varchar(100)  comment '',
   STARTDATE            date  comment '',
   ENDDATE              date  comment '',
   DESCRIPTION          varchar(255)  comment '',
   LOCATION             varchar(255)  comment '',
   STATUS               varchar(30)  comment '',
   CREATEDDATE          datetime  comment '',
   UPDATEDDATE          datetime  comment '',
   primary key (EVENTID)
);

/*==============================================================*/
/* Table: DONATION_REGISTRATION                                 */
/*==============================================================*/
create table DONATION_REGISTRATION
(
   REGISTRATIONID       int not null  comment '',
   EVENTID              int not null  comment '',
   DONORID              int not null  comment '',
   REGISTRATIONDATE     datetime  comment '',
   STATUS               varchar(30)  comment '',
   NOTES                varchar(255)  comment '',
   CREATEDDATE          datetime  comment '',
   UPDATEDDATE          datetime  comment '',
   primary key (REGISTRATIONID)
);

/*==============================================================*/
/* Table: DONOR                                                 */
/*==============================================================*/
create table DONOR
(
   DONORID              int not null  comment '',
   USERID               int not null  comment '',
   WEIGHT               decimal(5,2)  comment '',
   HEIGHT               decimal(5,2)  comment '',
   BLOODTYPENAME        varchar(5)  comment '',
   CREATEDDATE          datetime  comment '',
   UPDATEDDATE          datetime  comment '',
   primary key (DONORID)
);

/*==============================================================*/
/* Table: `MATCH`                                               */
/*==============================================================*/
create table `MATCH`
(
   USERID               int not null  comment '',
   REQUESTID            int not null  comment '',
   DONORID              int not null  comment '',
   MATCH_DATE           datetime  comment '',
   ACCEPTEDDATE         datetime  comment '',
   STATUS               varchar(30)  comment '',
   NOTES                varchar(255)  comment '',
   CREATEDDATE          datetime  comment '',
   UPDATEDDATE          datetime  comment '',
   ID_MATCH             int not null  comment '',
   primary key (REQUESTID, DONORID, ID_MATCH)
);

/*==============================================================*/
/* Table: NOTIFICATION                                          */
/*==============================================================*/
create table NOTIFICATION
(
   NOTIFICATIONID       int not null  comment '',
   USERID               int not null  comment '',
   TITLE                varchar(150)  comment '',
   CONTENT              text  comment '',
   NOTIFICATIONTYPE     varchar(30)  comment '',
   ISREAD               bool  comment '',
   CREATEDDATE          datetime  comment '',
   UPDATEDDATE          datetime  comment '',
   primary key (NOTIFICATIONID)
);

/*==============================================================*/
/* Table: RECIPIENT                                             */
/*==============================================================*/
create table RECIPIENT
(
   RECIPENTID           int not null  comment '',
   USERID               int not null  comment '',
   REASON               varchar(255)  comment '',
   CREATEDDATE          datetime  comment '',
   UPDATEDDATE          datetime  comment '',
   BLOODTYPENAME        varchar(5)  comment '',
   primary key (RECIPENTID)
);

/*==============================================================*/
/* Table: REPORT                                                */
/*==============================================================*/
create table REPORT
(
   REPORTID             int not null  comment '',
   USERID               int not null  comment '',
   REPORTTYPE           varchar(50)  comment '',
   FROMDATE             date  comment '',
   TODATE               date  comment '',
   DATA                 text  comment '',
   CREATEDDATE          datetime  comment '',
   UPDATEDDATE          datetime  comment '',
   primary key (REPORTID)
);

/*==============================================================*/
/* Table: ROLE                                                  */
/*==============================================================*/
create table ROLE
(
   ROLEID               int not null  comment '',
   ROLENAME             varchar(30)  comment '',
   DESCRIPTION          varchar(255)  comment '',
   CREATEDDATE          datetime  comment '',
   UPDATEDDATE          datetime  comment '',
   primary key (ROLEID)
);

/*==============================================================*/
/* Table: USER                                                  */
/*==============================================================*/
create table USER
(
   USERID               int not null  comment '',
   USERNAME             varchar(50)  comment '',
   EMAIL                varchar(100)  comment '',
   PASSWORD             varchar(255)  comment '',
   FULLNAME             varchar(100)  comment '',
   DATEOFBIRTH          date  comment '',
   GENDER               varchar(100)  comment '',
   PHONENUMBER          varchar(15)  comment '',
   ADDRESS              varchar(255)  comment '',
   PHOTO                varchar(255)  comment '',
   CREATEDDATE          datetime  comment '',
   UPDATEDDATE          datetime  comment '',
   primary key (USERID)
);

/*==============================================================*/
/* Table: USER_ROLE                                             */
/*==============================================================*/
create table USER_ROLE
(
   ROLEID               int not null  comment '',
   USERID               int not null  comment '',
   USERROLEID           int not null  comment '',
   CREATEDDATE          datetime  comment '',
   UPDATEDDATE          datetime  comment '',
   primary key (ROLEID, USERID, USERROLEID)
);

alter table BLOOD_REQUEST add constraint FK_BLOOD_RE_RELATIONS_RECIPIEN foreign key (RECIPENTID)
      references RECIPIENT (RECIPENTID) on delete restrict on update restrict;

alter table BLOOD_TEST add constraint FK_BLOOD_TE_RELATIONS_DONATION foreign key (DONATIONID)
      references DONATION (DONATIONID) on delete restrict on update restrict;

alter table DONATION add constraint FK_DONATION_RELATIONS_DONATION foreign key (REGISTRATIONID)
      references DONATION_REGISTRATION (REGISTRATIONID) on delete restrict on update restrict;

alter table DONATION_REGISTRATION add constraint FK_DONATION_RELATIONS_DONOR foreign key (DONORID)
      references DONOR (DONORID) on delete restrict on update restrict;

alter table DONATION_REGISTRATION add constraint FK_DONATION_RELATIONS_EVENT foreign key (EVENTID)
      references DONATION_EVENT (EVENTID) on delete restrict on update restrict;

alter table DONOR add constraint FK_DONOR_RELATIONS_USER foreign key (USERID)
      references USER (USERID) on delete restrict on update restrict;

alter table `MATCH` add constraint FK_MATCH_RELATIONS_DONOR foreign key (DONORID)
      references DONOR (DONORID) on delete restrict on update restrict;

alter table `MATCH` add constraint FK_MATCH_RELATIONS_BLOOD_RE foreign key (REQUESTID)
      references BLOOD_REQUEST (REQUESTID) on delete restrict on update restrict;

alter table NOTIFICATION add constraint FK_NOTIFICA_RELATIONS_USER foreign key (USERID)
      references USER (USERID) on delete restrict on update restrict;

alter table RECIPIENT add constraint FK_RECIPIEN_RELATIONS_USER foreign key (USERID)
      references USER (USERID) on delete restrict on update restrict;

alter table REPORT add constraint FK_REPORT_RELATIONS_USER foreign key (USERID)
      references USER (USERID) on delete restrict on update restrict;

alter table USER_ROLE add constraint FK_USER_ROL_RELATIONS_USER foreign key (USERID)
      references USER (USERID) on delete restrict on update restrict;

alter table USER_ROLE add constraint FK_USER_ROL_RELATIONS_ROLE foreign key (ROLEID)
      references ROLE (ROLEID) on delete restrict on update restrict;