/*!
 * iana.js - assigned names/numbers
 * Copyright (c) 2018, Christopher Jeffrey (MIT License).
 * https://github.com/chjj/bns
 *
 * Resources
 *   http://www.iana.org/assignments/port-numbers
 *   https://tools.ietf.org/html/rfc6335
 *   https://tools.ietf.org/html/rfc1010
 *   https://www.ietf.org/rfc/rfc1035.txt
 *   https://github.com/c-ares/c-ares/blob/master/ares_platform.c
 */

'use strict';

const assert = require('bsert');
const constants = require('../constants');
const toSymbol = constants._toSymbol;
const fromSymbol = constants._fromSymbol;
const isSymbol = constants._isSymbol;

/*
 * IANA
 */

const iana = exports;

/**
 * IANA Protocol Numbers
 * @enum {Number}
 * @default
 */

const protocols = {
  RESERVED: 0, // Reserved
  ICMP: 1, // Internet Control Message
  IGMP: 2, // Internet Group Management
  GGP: 3, // Gateway-to-Gateway
  // 4 unassigned
  ST: 5, // Stream
  TCP: 6, // Transmission Control
  UCL: 7, // UCL
  EGP: 8, // Exterior Gateway Protocol
  IGP: 9, // any private interior gateway
  'BBN-RCC-MON': 10, // BBN RCC Monitoring
  'NVP-II': 11, // Network Voice Protocol
  PUP: 12, // PUP
  ARGUS: 13, // ARGUS
  EMCON: 14, // EMCON
  XNET: 15, // Cross Net Debugger
  CHAOS: 16, // Chaos
  UDP: 17, // User Datagram
  MUX: 17, // Multiplexing
  'DCN-MEAS': 19, // DCN Measurement Subsystems
  HMP: 20, // Host Monitoring
  PRM: 21, // Packet Radio Measurement
  'XNS-IDP': 22, // XEROX NS IDP
  'TRUNK-1': 23, // Trunk-1
  'TRUNK-2': 24, // Trunk-2
  'LEAF-1': 25, // Leaf-1
  'LEAF-2': 26, // Leaf-2
  RDP: 27, // Reliable Data Protocol
  IRTP: 28, // Internet Reliable Transaction
  'ISO-TP4': 29, // ISO Transport Protocol Class 4
  NETBLT: 30, // Bulk Data Transfer Protocol
  'MFE-NSP': 31, // MFE Network Services Protocol
  'MERIT-INP': 32, // MERIT Internodal Protocol
  SEP: 33, // Sequential Exchange Protocol
  // 34-60 unassigned
  INTERNAL: 61, // any host internal protocol
  CFTP: 62, // CFTP
  LOCAL: 63 // any local network
};

/**
 * IANA Protocol Numbers by value
 * @const {Object}
 */

const protocolsByVal = {
  [protocols.RESERVED]: 'RESERVED',
  [protocols.ICMP]: 'ICMP',
  [protocols.IGMP]: 'IGMP',
  [protocols.GGP]: 'GGP',
  [protocols.ST]: 'ST',
  [protocols.TCP]: 'TCP',
  [protocols.UCL]: 'UCL',
  [protocols.EGP]: 'EGP',
  [protocols.IGP]: 'IGP',
  [protocols['BBN-RCC-MON']]: 'BBN-RCC-MON',
  [protocols['NVP-II']]: 'NVP-II',
  [protocols.PUP]: 'PUP',
  [protocols.ARGUS]: 'ARGUS',
  [protocols.EMCON]: 'EMCON',
  [protocols.XNET]: 'XNET',
  [protocols.CHAOS]: 'CHAOS',
  [protocols.UDP]: 'UDP',
  [protocols.MUX]: 'MUX',
  [protocols['DCN-MEAS']]: 'DCN-MEAS',
  [protocols.HMP]: 'HMP',
  [protocols.PRM]: 'PRM',
  [protocols['XNS-IDP']]: 'XNS-IDP',
  [protocols['TRUNK-1']]: 'TRUNK-1',
  [protocols['TRUNK-2']]: 'TRUNK-2',
  [protocols['LEAF-1']]: 'LEAF-1',
  [protocols['LEAF-2']]: 'LEAF-2',
  [protocols.RDP]: 'RDP',
  [protocols.IRTP]: 'IRTP',
  [protocols['ISO-TP4']]: 'ISO-TP4',
  [protocols.NETBLT]: 'NETBLT',
  [protocols['MFE-NSP']]: 'MFE-NSP',
  [protocols['MERIT-INP']]: 'MERIT-INP',
  [protocols.SEP]: 'SEP',
  [protocols.INTERNAL]: 'INTERNAL',
  [protocols.CFTP]: 'CFTP',
  [protocols.LOCAL]: 'LOCAL'
};

/**
 * IANA Port Numbers
 * @enum {Number}
 * @default
 */

const services = {
  'tcpmux': 1,
  'compressnet': 2,
  'rje': 5,
  'echo': 7,
  'discard': 9,
  'systat': 11,
  'daytime': 13,
  'qotd': 17,
  'msp': 18,
  'chargen': 19,
  'ftp-data': 20,
  'ftp': 21,
  'ssh': 22,
  'telnet': 23,
  'smtp': 25,
  'nsw-fe': 27,
  'msg-icp': 29,
  'msg-auth': 31,
  'dsp': 33,
  'time': 37,
  'rap': 38,
  'rlp': 39,
  'graphics': 41,
  'name': 42,
  'nameserver': 42,
  'nicname': 43,
  'mpm-flags': 44,
  'mpm': 45,
  'mpm-snd': 46,
  'ni-ftp': 47,
  'auditd': 48,
  'tacacs': 49,
  're-mail-ck': 50,
  'la-maint': 51,
  'xns-time': 52,
  'domain': 53,
  'xns-ch': 54,
  'isi-gl': 55,
  'xns-auth': 56,
  'xns-mail': 58,
  'ni-mail': 61,
  'acas': 62,
  'whois++': 63,
  'covia': 64,
  'tacacs-ds': 65,
  'sql*net': 66,
  'bootps': 67,
  'bootpc': 68,
  'tftp': 69,
  'gopher': 70,
  'netrjs-1': 71,
  'netrjs-2': 72,
  'netrjs-3': 73,
  'netrjs-4': 74,
  'deos': 76,
  'vettcp': 78,
  'finger': 79,
  'http': 80,
  'www': 80,
  'www-http': 80,
  'xfer': 82,
  'mit-ml-dev': 83,
  'ctf': 84,
  'mfcobol': 86,
  'kerberos': 88,
  'su-mit-tg': 89,
  'dnsix': 90,
  'mit-dov': 91,
  'npp': 92,
  'dcp': 93,
  'objcall': 94,
  'supdup': 95,
  'dixie': 96,
  'swift-rvf': 97,
  'tacnews': 98,
  'metagram': 99,
  'newacct': 100,
  'hostname': 101,
  'iso-tsap': 102,
  'gppitnp': 103,
  'acr-nema': 104,
  'cso': 105,
  'csnet-ns': 105,
  '3com-tsmux': 106,
  'rtelnet': 107,
  'snagas': 108,
  'pop2': 109,
  'pop3': 110,
  'sunrpc': 111,
  'mcidas': 112,
  'ident': 113,
  'auth': 113,
  'sftp': 115,
  'ansanotify': 116,
  'uucp-path': 117,
  'sqlserv': 118,
  'nntp': 119,
  'cfdptkt': 120,
  'erpc': 121,
  'smakynet': 122,
  'ntp': 123,
  'ansatrader': 124,
  'locus-map': 125,
  'nxedit': 126,
  'locus-con': 127,
  'gss-xlicen': 128,
  'pwdgen': 129,
  'cisco-fna': 130,
  'cisco-tna': 131,
  'cisco-sys': 132,
  'statsrv': 133,
  'ingres-net': 134,
  'epmap': 135,
  'profile': 136,
  'netbios-ns': 137,
  'netbios-dgm': 138,
  'netbios-ssn': 139,
  'emfis-data': 140,
  'emfis-cntl': 141,
  'bl-idm': 142,
  'imap': 143,
  'uma': 144,
  'uaac': 145,
  'iso-tp0': 146,
  'iso-ip': 147,
  'jargon': 148,
  'aed-512': 149,
  'sql-net': 150,
  'hems': 151,
  'bftp': 152,
  'sgmp': 153,
  'netsc-prod': 154,
  'netsc-dev': 155,
  'sqlsrv': 156,
  'knet-cmp': 157,
  'pcmail-srv': 158,
  'nss-routing': 159,
  'sgmp-traps': 160,
  'snmp': 161,
  'snmptrap': 162,
  'cmip-man': 163,
  'cmip-agent': 164,
  'xns-courier': 165,
  's-net': 166,
  'namp': 167,
  'rsvd': 168,
  'send': 169,
  'print-srv': 170,
  'multiplex': 171,
  'cl/1': 172,
  'xyplex-mux': 173,
  'mailq': 174,
  'vmnet': 175,
  'genrad-mux': 176,
  'xdmcp': 177,
  'nextstep': 178,
  'bgp': 179,
  'ris': 180,
  'unify': 181,
  'audit': 182,
  'ocbinder': 183,
  'ocserver': 184,
  'remote-kis': 185,
  'kis': 186,
  'aci': 187,
  'mumps': 188,
  'qft': 189,
  'gacp': 190,
  'prospero': 191,
  'osu-nms': 192,
  'srmp': 193,
  'irc': 194,
  'dn6-nlm-aud': 195,
  'dn6-smm-red': 196,
  'dls': 197,
  'dls-mon': 198,
  'smux': 199,
  'src': 200,
  'at-rtmp': 201,
  'at-nbp': 202,
  'at-3': 203,
  'at-echo': 204,
  'at-5': 205,
  'at-zis': 206,
  'at-7': 207,
  'at-8': 208,
  'qmtp': 209,
  'z39.50': 210,
  '914c/g': 211,
  'anet': 212,
  'ipx': 213,
  'vmpwscs': 214,
  'softpc': 215,
  'CAIlic': 216,
  'dbase': 217,
  'mpp': 218,
  'uarps': 219,
  'imap3': 220,
  'fln-spx': 221,
  'rsh-spx': 222,
  'cdc': 223,
  'masqdialer': 224,
  'direct': 242,
  'sur-meas': 243,
  'inbusiness': 244,
  'link': 245,
  'dsp3270': 246,
  'subntbcst_tftp': 247,
  'bhfhs': 248,
  'set': 257,
  'esro-gen': 259,
  'openport': 260,
  'nsiiops': 261,
  'arcisdms': 262,
  'hdap': 263,
  'bgmp': 264,
  'x-bone-ctl': 265,
  'sst': 266,
  'td-service': 267,
  'td-replica': 268,
  'manet': 269,
  'gist': 270,
  'http-mgmt': 280,
  'personal-link': 281,
  'cableport-ax': 282,
  'rescap': 283,
  'corerjd': 284,
  'fxp': 286,
  'k-block': 287,
  'novastorbakcup': 308,
  'entrusttime': 309,
  'bhmds': 310,
  'asip-webadmin': 311,
  'vslmp': 312,
  'magenta-logic': 313,
  'opalis-robot': 314,
  'dpsi': 315,
  'decauth': 316,
  'zannet': 317,
  'pkix-timestamp': 318,
  'ptp-event': 319,
  'ptp-general': 320,
  'pip': 321,
  'rtsps': 322,
  'texar': 333,
  'pdap': 344,
  'pawserv': 345,
  'zserv': 346,
  'fatserv': 347,
  'csi-sgwp': 348,
  'mftp': 349,
  'matip-type-a': 350,
  'matip-type-b': 351,
  'bhoetty': 351,
  'dtag-ste-sb': 352,
  'bhoedap4': 352,
  'ndsauth': 353,
  'bh611': 354,
  'datex-asn': 355,
  'cloanto-net-1': 356,
  'bhevent': 357,
  'shrinkwrap': 358,
  'nsrmp': 359,
  'scoi2odialog': 360,
  'semantix': 361,
  'srssend': 362,
  'rsvp_tunnel': 363,
  'aurora-cmgr': 364,
  'dtk': 365,
  'odmr': 366,
  'mortgageware': 367,
  'qbikgdp': 368,
  'rpc2portmap': 369,
  'codaauth2': 370,
  'clearcase': 371,
  'ulistproc': 372,
  'legent-1': 373,
  'legent-2': 374,
  'hassle': 375,
  'nip': 376,
  'tnETOS': 377,
  'dsETOS': 378,
  'is99c': 379,
  'is99s': 380,
  'hp-collector': 381,
  'hp-managed-node': 382,
  'hp-alarm-mgr': 383,
  'arns': 384,
  'ibm-app': 385,
  'asa': 386,
  'aurp': 387,
  'unidata-ldm': 388,
  'ldap': 389,
  'uis': 390,
  'synotics-relay': 391,
  'synotics-broker': 392,
  'meta5': 393,
  'embl-ndt': 394,
  'netcp': 395,
  'netware-ip': 396,
  'mptn': 397,
  'kryptolan': 398,
  'iso-tsap-c2': 399,
  'osb-sd': 400,
  'ups': 401,
  'genie': 402,
  'decap': 403,
  'nced': 404,
  'ncld': 405,
  'imsp': 406,
  'timbuktu': 407,
  'prm-sm': 408,
  'prm-nm': 409,
  'decladebug': 410,
  'rmt': 411,
  'synoptics-trap': 412,
  'smsp': 413,
  'infoseek': 414,
  'bnet': 415,
  'silverplatter': 416,
  'onmux': 417,
  'hyper-g': 418,
  'ariel1': 419,
  'smpte': 420,
  'ariel2': 421,
  'ariel3': 422,
  'opc-job-start': 423,
  'opc-job-track': 424,
  'icad-el': 425,
  'smartsdp': 426,
  'svrloc': 427,
  'ocs_cmu': 428,
  'ocs_amu': 429,
  'utmpsd': 430,
  'utmpcd': 431,
  'iasd': 432,
  'nnsp': 433,
  'mobileip-agent': 434,
  'mobilip-mn': 435,
  'dna-cml': 436,
  'comscm': 437,
  'dsfgw': 438,
  'dasp': 439,
  'sgcp': 440,
  'decvms-sysmgt': 441,
  'cvc_hostd': 442,
  'https': 443,
  'snpp': 444,
  'microsoft-ds': 445,
  'ddm-rdb': 446,
  'ddm-dfm': 447,
  'ddm-ssl': 448,
  'as-servermap': 449,
  'tserver': 450,
  'sfs-smp-net': 451,
  'sfs-config': 452,
  'creativeserver': 453,
  'contentserver': 454,
  'creativepartnr': 455,
  'macon-tcp': 456,
  'macon-udp': 456,
  'scohelp': 457,
  'appleqtc': 458,
  'ampr-rcmd': 459,
  'skronk': 460,
  'datasurfsrv': 461,
  'datasurfsrvsec': 462,
  'alpes': 463,
  'kpasswd': 464,
  'urd': 465,
  'igmpv3lite': 465,
  'digital-vrc': 466,
  'mylex-mapd': 467,
  'photuris': 468,
  'rcp': 469,
  'scx-proxy': 470,
  'mondex': 471,
  'ljk-login': 472,
  'hybrid-pop': 473,
  'tn-tl-w1': 474,
  'tn-tl-w2': 474,
  'tcpnethaspsrv': 475,
  'tn-tl-fd1': 476,
  'ss7ns': 477,
  'spsc': 478,
  'iafserver': 479,
  'iafdbase': 480,
  'ph': 481,
  'bgs-nsi': 482,
  'ulpnet': 483,
  'integra-sme': 484,
  'powerburst': 485,
  'avian': 486,
  'saft': 487,
  'gss-http': 488,
  'nest-protocol': 489,
  'micom-pfs': 490,
  'go-login': 491,
  'ticf-1': 492,
  'ticf-2': 493,
  'pov-ray': 494,
  'intecourier': 495,
  'pim-rp-disc': 496,
  'dantz': 497,
  'siam': 498,
  'iso-ill': 499,
  'isakmp': 500,
  'stmf': 501,
  'asa-appl-proto': 502,
  'intrinsa': 503,
  'citadel': 504,
  'mailbox-lm': 505,
  'ohimsrv': 506,
  'crs': 507,
  'xvttp': 508,
  'snare': 509,
  'fcp': 510,
  'passgo': 511,
  'exec': 512,
  'comsat': 512,
  'biff': 512,
  'login': 513,
  'who': 513,
  'shell': 514,
  'syslog': 514,
  'printer': 515,
  'videotex': 516,
  'talk': 517,
  'ntalk': 518,
  'utime': 519,
  'efs': 520,
  'router': 520,
  'ripng': 521,
  'ulp': 522,
  'ibm-db2': 523,
  'ncp': 524,
  'timed': 525,
  'tempo': 526,
  'stx': 527,
  'custix': 528,
  'irc-serv': 529,
  'courier': 530,
  'conference': 531,
  'netnews': 532,
  'netwall': 533,
  'windream': 534,
  'iiop': 535,
  'opalis-rdv': 536,
  'nmsp': 537,
  'gdomap': 538,
  'apertus-ldp': 539,
  'uucp': 540,
  'uucp-rlogin': 541,
  'commerce': 542,
  'klogin': 543,
  'kshell': 544,
  'appleqtcsrvr': 545,
  'dhcpv6-client': 546,
  'dhcpv6-server': 547,
  'afpovertcp': 548,
  'idfp': 549,
  'new-rwho': 550,
  'cybercash': 551,
  'devshr-nts': 552,
  'pirp': 553,
  'rtsp': 554,
  'dsf': 555,
  'remotefs': 556,
  'openvms-sysipc': 557,
  'sdnskmp': 558,
  'teedtap': 559,
  'rmonitor': 560,
  'monitor': 561,
  'chshell': 562,
  'nntps': 563,
  '9pfs': 564,
  'whoami': 565,
  'streettalk': 566,
  'banyan-rpc': 567,
  'ms-shuttle': 568,
  'ms-rome': 569,
  'meter': 570,
  'sonar': 572,
  'banyan-vip': 573,
  'ftp-agent': 574,
  'vemmi': 575,
  'ipcd': 576,
  'vnas': 577,
  'ipdd': 578,
  'decbsrv': 579,
  'sntp-heartbeat': 580,
  'bdp': 581,
  'scc-security': 582,
  'philips-vc': 583,
  'keyserver': 584,
  'password-chg': 586,
  'submission': 587,
  'cal': 588,
  'eyelink': 589,
  'tns-cml': 590,
  'http-alt': 591,
  'eudora-set': 592,
  'http-rpc-epmap': 593,
  'tpip': 594,
  'cab-protocol': 595,
  'smsd': 596,
  'ptcnameservice': 597,
  'sco-websrvrmg3': 598,
  'acp': 599,
  'ipcserver': 600,
  'syslog-conn': 601,
  'xmlrpc-beep': 602,
  'idxp': 603,
  'tunnel': 604,
  'soap-beep': 605,
  'urm': 606,
  'nqs': 607,
  'sift-uft': 608,
  'npmp-trap': 609,
  'npmp-local': 610,
  'npmp-gui': 611,
  'hmmp-ind': 612,
  'hmmp-op': 613,
  'sshell': 614,
  'sco-inetmgr': 615,
  'sco-sysmgr': 616,
  'sco-dtmgr': 617,
  'dei-icda': 618,
  'compaq-evm': 619,
  'sco-websrvrmgr': 620,
  'escp-ip': 621,
  'collaborator': 622,
  'oob-ws-http': 623,
  'asf-rmcp': 623,
  'cryptoadmin': 624,
  'dec_dlm': 625,
  'asia': 626,
  'passgo-tivoli': 627,
  'qmqp': 628,
  '3com-amp3': 629,
  'rda': 630,
  'ipp': 631,
  'bmpp': 632,
  'servstat': 633,
  'ginad': 634,
  'rlzdbase': 635,
  'ldaps': 636,
  'lanserver': 637,
  'mcns-sec': 638,
  'msdp': 639,
  'entrust-sps': 640,
  'repcmd': 641,
  'esro-emsdp': 642,
  'sanity': 643,
  'dwr': 644,
  'pssc': 645,
  'ldp': 646,
  'dhcp-failover': 647,
  'rrp': 648,
  'cadview-3d': 649,
  'obex': 650,
  'ieee-mms': 651,
  'hello-port': 652,
  'repscmd': 653,
  'aodv': 654,
  'tinc': 655,
  'spmp': 656,
  'rmc': 657,
  'tenfold': 658,
  'mac-srvr-admin': 660,
  'hap': 661,
  'pftp': 662,
  'purenoise': 663,
  'oob-ws-https': 664,
  'asf-secure-rmcp': 664,
  'sun-dr': 665,
  'mdqs': 666,
  'doom': 666,
  'disclose': 667,
  'mecomm': 668,
  'meregister': 669,
  'vacdsm-sws': 670,
  'vacdsm-app': 671,
  'vpps-qua': 672,
  'cimplex': 673,
  'acap': 674,
  'dctp': 675,
  'vpps-via': 676,
  'vpp': 677,
  'ggf-ncp': 678,
  'mrm': 679,
  'entrust-aaas': 680,
  'entrust-aams': 681,
  'xfr': 682,
  'corba-iiop': 683,
  'corba-iiop-ssl': 684,
  'mdc-portmapper': 685,
  'hcp-wismar': 686,
  'asipregistry': 687,
  'realm-rusd': 688,
  'nmap': 689,
  'vatp': 690,
  'msexch-routing': 691,
  'hyperwave-isp': 692,
  'connendp': 693,
  'ha-cluster': 694,
  'ieee-mms-ssl': 695,
  'rushd': 696,
  'uuidgen': 697,
  'olsr': 698,
  'accessnetwork': 699,
  'epp': 700,
  'lmp': 701,
  'iris-beep': 702,
  'elcsd': 704,
  'agentx': 705,
  'silc': 706,
  'borland-dsj': 707,
  'entrust-kmsh': 709,
  'entrust-ash': 710,
  'cisco-tdp': 711,
  'tbrpf': 712,
  'iris-xpc': 713,
  'iris-xpcs': 714,
  'iris-lwz': 715,
  'pana': 716,
  'netviewdm1': 729,
  'netviewdm2': 730,
  'netviewdm3': 731,
  'netgw': 741,
  'netrcs': 742,
  'flexlm': 744,
  'fujitsu-dev': 747,
  'ris-cm': 748,
  'kerberos-adm': 749,
  'rfile': 750,
  'loadav': 750,
  'kerberos-iv': 750,
  'pump': 751,
  'qrh': 752,
  'rrh': 753,
  'tell': 754,
  'nlogin': 758,
  'con': 759,
  'ns': 760,
  'rxe': 761,
  'quotad': 762,
  'cycleserv': 763,
  'omserv': 764,
  'webster': 765,
  'phonebook': 767,
  'vid': 769,
  'cadlock': 770,
  'rtip': 771,
  'cycleserv2': 772,
  'submit': 773,
  'notify': 773,
  'rpasswd': 774,
  'acmaint_dbd': 774,
  'entomb': 775,
  'acmaint_transd': 775,
  'wpages': 776,
  'multiling-http': 777,
  'wpgs': 780,
  'mdbs_daemon': 800,
  'device': 801,
  'fcp-udp': 810,
  'itm-mcell-s': 828,
  'pkix-3-ca-ra': 829,
  'netconf-ssh': 830,
  'netconf-beep': 831,
  'netconfsoaphttp': 832,
  'netconfsoapbeep': 833,
  'dhcp-failover2': 847,
  'gdoi': 848,
  'iscsi': 860,
  'owamp-control': 861,
  'twamp-control': 862,
  'rsync': 873,
  'iclcnet-locate': 886,
  'iclcnet_svinfo': 887,
  'accessbuilder': 888,
  'cddbp': 888,
  'omginitialrefs': 900,
  'smpnameres': 901,
  'ideafarm-door': 902,
  'ideafarm-panic': 903,
  'kink': 910,
  'xact-backup': 911,
  'apex-mesh': 912,
  'apex-edge': 913,
  'ftps-data': 989,
  'ftps': 990,
  'nas': 991,
  'telnets': 992,
  'imaps': 993,
  'ircs': 994,
  'pop3s': 995,
  'vsinet': 996,
  'maitrd': 997,
  'busboy': 998,
  'puparp': 998,
  'garcon': 999,
  'applix': 999,
  'puprouter': 999,
  'cadlock2': 1000,
  'surf': 1010,
  'exp1': 1021,
  'exp2': 1022
};

/**
 * IANA Port Numbers by value
 * @const {Object}
 */

const servicesByVal = {
  1: 'tcpmux',
  2: 'compressnet',
  3: 'compressnet',
  5: 'rje',
  7: 'echo',
  9: 'discard',
  11: 'systat',
  13: 'daytime',
  17: 'qotd',
  18: 'msp',
  19: 'chargen',
  20: 'ftp-data',
  21: 'ftp',
  22: 'ssh',
  23: 'telnet',
  25: 'smtp',
  27: 'nsw-fe',
  29: 'msg-icp',
  31: 'msg-auth',
  33: 'dsp',
  37: 'time',
  38: 'rap',
  39: 'rlp',
  41: 'graphics',
  42: 'name',
  43: 'nicname',
  44: 'mpm-flags',
  45: 'mpm',
  46: 'mpm-snd',
  47: 'ni-ftp',
  48: 'auditd',
  49: 'tacacs',
  50: 're-mail-ck',
  51: 'la-maint',
  52: 'xns-time',
  53: 'domain',
  54: 'xns-ch',
  55: 'isi-gl',
  56: 'xns-auth',
  58: 'xns-mail',
  61: 'ni-mail',
  62: 'acas',
  63: 'whois++',
  64: 'covia',
  65: 'tacacs-ds',
  66: 'sql*net',
  67: 'bootps',
  68: 'bootpc',
  69: 'tftp',
  70: 'gopher',
  71: 'netrjs-1',
  72: 'netrjs-2',
  73: 'netrjs-3',
  74: 'netrjs-4',
  76: 'deos',
  78: 'vettcp',
  79: 'finger',
  80: 'http',
  82: 'xfer',
  83: 'mit-ml-dev',
  84: 'ctf',
  85: 'mit-ml-dev',
  86: 'mfcobol',
  88: 'kerberos',
  89: 'su-mit-tg',
  90: 'dnsix',
  91: 'mit-dov',
  92: 'npp',
  93: 'dcp',
  94: 'objcall',
  95: 'supdup',
  96: 'dixie',
  97: 'swift-rvf',
  98: 'tacnews',
  99: 'metagram',
  100: 'newacct',
  101: 'hostname',
  102: 'iso-tsap',
  103: 'gppitnp',
  104: 'acr-nema',
  105: 'cso',
  106: '3com-tsmux',
  107: 'rtelnet',
  108: 'snagas',
  109: 'pop2',
  110: 'pop3',
  111: 'sunrpc',
  112: 'mcidas',
  113: 'ident',
  115: 'sftp',
  116: 'ansanotify',
  117: 'uucp-path',
  118: 'sqlserv',
  119: 'nntp',
  120: 'cfdptkt',
  121: 'erpc',
  122: 'smakynet',
  123: 'ntp',
  124: 'ansatrader',
  125: 'locus-map',
  126: 'nxedit',
  127: 'locus-con',
  128: 'gss-xlicen',
  129: 'pwdgen',
  130: 'cisco-fna',
  131: 'cisco-tna',
  132: 'cisco-sys',
  133: 'statsrv',
  134: 'ingres-net',
  135: 'epmap',
  136: 'profile',
  137: 'netbios-ns',
  138: 'netbios-dgm',
  139: 'netbios-ssn',
  140: 'emfis-data',
  141: 'emfis-cntl',
  142: 'bl-idm',
  143: 'imap',
  144: 'uma',
  145: 'uaac',
  146: 'iso-tp0',
  147: 'iso-ip',
  148: 'jargon',
  149: 'aed-512',
  150: 'sql-net',
  151: 'hems',
  152: 'bftp',
  153: 'sgmp',
  154: 'netsc-prod',
  155: 'netsc-dev',
  156: 'sqlsrv',
  157: 'knet-cmp',
  158: 'pcmail-srv',
  159: 'nss-routing',
  160: 'sgmp-traps',
  161: 'snmp',
  162: 'snmptrap',
  163: 'cmip-man',
  164: 'cmip-agent',
  165: 'xns-courier',
  166: 's-net',
  167: 'namp',
  168: 'rsvd',
  169: 'send',
  170: 'print-srv',
  171: 'multiplex',
  172: 'cl/1',
  173: 'xyplex-mux',
  174: 'mailq',
  175: 'vmnet',
  176: 'genrad-mux',
  177: 'xdmcp',
  178: 'nextstep',
  179: 'bgp',
  180: 'ris',
  181: 'unify',
  182: 'audit',
  183: 'ocbinder',
  184: 'ocserver',
  185: 'remote-kis',
  186: 'kis',
  187: 'aci',
  188: 'mumps',
  189: 'qft',
  190: 'gacp',
  191: 'prospero',
  192: 'osu-nms',
  193: 'srmp',
  194: 'irc',
  195: 'dn6-nlm-aud',
  196: 'dn6-smm-red',
  197: 'dls',
  198: 'dls-mon',
  199: 'smux',
  200: 'src',
  201: 'at-rtmp',
  202: 'at-nbp',
  203: 'at-3',
  204: 'at-echo',
  205: 'at-5',
  206: 'at-zis',
  207: 'at-7',
  208: 'at-8',
  209: 'qmtp',
  210: 'z39.50',
  211: '914c/g',
  212: 'anet',
  213: 'ipx',
  214: 'vmpwscs',
  215: 'softpc',
  216: 'CAIlic',
  217: 'dbase',
  218: 'mpp',
  219: 'uarps',
  220: 'imap3',
  221: 'fln-spx',
  222: 'rsh-spx',
  223: 'cdc',
  224: 'masqdialer',
  242: 'direct',
  243: 'sur-meas',
  244: 'inbusiness',
  245: 'link',
  246: 'dsp3270',
  247: 'subntbcst_tftp',
  248: 'bhfhs',
  256: 'rap',
  257: 'set',
  259: 'esro-gen',
  260: 'openport',
  261: 'nsiiops',
  262: 'arcisdms',
  263: 'hdap',
  264: 'bgmp',
  265: 'x-bone-ctl',
  266: 'sst',
  267: 'td-service',
  268: 'td-replica',
  269: 'manet',
  270: 'gist',
  280: 'http-mgmt',
  281: 'personal-link',
  282: 'cableport-ax',
  283: 'rescap',
  284: 'corerjd',
  286: 'fxp',
  287: 'k-block',
  308: 'novastorbakcup',
  309: 'entrusttime',
  310: 'bhmds',
  311: 'asip-webadmin',
  312: 'vslmp',
  313: 'magenta-logic',
  314: 'opalis-robot',
  315: 'dpsi',
  316: 'decauth',
  317: 'zannet',
  318: 'pkix-timestamp',
  319: 'ptp-event',
  320: 'ptp-general',
  321: 'pip',
  322: 'rtsps',
  333: 'texar',
  344: 'pdap',
  345: 'pawserv',
  346: 'zserv',
  347: 'fatserv',
  348: 'csi-sgwp',
  349: 'mftp',
  350: 'matip-type-a',
  351: 'matip-type-b',
  352: 'dtag-ste-sb',
  353: 'ndsauth',
  354: 'bh611',
  355: 'datex-asn',
  356: 'cloanto-net-1',
  357: 'bhevent',
  358: 'shrinkwrap',
  359: 'nsrmp',
  360: 'scoi2odialog',
  361: 'semantix',
  362: 'srssend',
  363: 'rsvp_tunnel',
  364: 'aurora-cmgr',
  365: 'dtk',
  366: 'odmr',
  367: 'mortgageware',
  368: 'qbikgdp',
  369: 'rpc2portmap',
  370: 'codaauth2',
  371: 'clearcase',
  372: 'ulistproc',
  373: 'legent-1',
  374: 'legent-2',
  375: 'hassle',
  376: 'nip',
  377: 'tnETOS',
  378: 'dsETOS',
  379: 'is99c',
  380: 'is99s',
  381: 'hp-collector',
  382: 'hp-managed-node',
  383: 'hp-alarm-mgr',
  384: 'arns',
  385: 'ibm-app',
  386: 'asa',
  387: 'aurp',
  388: 'unidata-ldm',
  389: 'ldap',
  390: 'uis',
  391: 'synotics-relay',
  392: 'synotics-broker',
  393: 'meta5',
  394: 'embl-ndt',
  395: 'netcp',
  396: 'netware-ip',
  397: 'mptn',
  398: 'kryptolan',
  399: 'iso-tsap-c2',
  400: 'osb-sd',
  401: 'ups',
  402: 'genie',
  403: 'decap',
  404: 'nced',
  405: 'ncld',
  406: 'imsp',
  407: 'timbuktu',
  408: 'prm-sm',
  409: 'prm-nm',
  410: 'decladebug',
  411: 'rmt',
  412: 'synoptics-trap',
  413: 'smsp',
  414: 'infoseek',
  415: 'bnet',
  416: 'silverplatter',
  417: 'onmux',
  418: 'hyper-g',
  419: 'ariel1',
  420: 'smpte',
  421: 'ariel2',
  422: 'ariel3',
  423: 'opc-job-start',
  424: 'opc-job-track',
  425: 'icad-el',
  426: 'smartsdp',
  427: 'svrloc',
  428: 'ocs_cmu',
  429: 'ocs_amu',
  430: 'utmpsd',
  431: 'utmpcd',
  432: 'iasd',
  433: 'nnsp',
  434: 'mobileip-agent',
  435: 'mobilip-mn',
  436: 'dna-cml',
  437: 'comscm',
  438: 'dsfgw',
  439: 'dasp',
  440: 'sgcp',
  441: 'decvms-sysmgt',
  442: 'cvc_hostd',
  443: 'https',
  444: 'snpp',
  445: 'microsoft-ds',
  446: 'ddm-rdb',
  447: 'ddm-dfm',
  448: 'ddm-ssl',
  449: 'as-servermap',
  450: 'tserver',
  451: 'sfs-smp-net',
  452: 'sfs-config',
  453: 'creativeserver',
  454: 'contentserver',
  455: 'creativepartnr',
  456: 'macon-tcp',
  457: 'scohelp',
  458: 'appleqtc',
  459: 'ampr-rcmd',
  460: 'skronk',
  461: 'datasurfsrv',
  462: 'datasurfsrvsec',
  463: 'alpes',
  464: 'kpasswd',
  465: 'urd',
  466: 'digital-vrc',
  467: 'mylex-mapd',
  468: 'photuris',
  469: 'rcp',
  470: 'scx-proxy',
  471: 'mondex',
  472: 'ljk-login',
  473: 'hybrid-pop',
  474: 'tn-tl-w1',
  475: 'tcpnethaspsrv',
  476: 'tn-tl-fd1',
  477: 'ss7ns',
  478: 'spsc',
  479: 'iafserver',
  480: 'iafdbase',
  481: 'ph',
  482: 'bgs-nsi',
  483: 'ulpnet',
  484: 'integra-sme',
  485: 'powerburst',
  486: 'avian',
  487: 'saft',
  488: 'gss-http',
  489: 'nest-protocol',
  490: 'micom-pfs',
  491: 'go-login',
  492: 'ticf-1',
  493: 'ticf-2',
  494: 'pov-ray',
  495: 'intecourier',
  496: 'pim-rp-disc',
  497: 'dantz',
  498: 'siam',
  499: 'iso-ill',
  500: 'isakmp',
  501: 'stmf',
  502: 'asa-appl-proto',
  503: 'intrinsa',
  504: 'citadel',
  505: 'mailbox-lm',
  506: 'ohimsrv',
  507: 'crs',
  508: 'xvttp',
  509: 'snare',
  510: 'fcp',
  511: 'passgo',
  512: 'exec',
  513: 'login',
  514: 'shell',
  515: 'printer',
  516: 'videotex',
  517: 'talk',
  518: 'ntalk',
  519: 'utime',
  520: 'efs',
  521: 'ripng',
  522: 'ulp',
  523: 'ibm-db2',
  524: 'ncp',
  525: 'timed',
  526: 'tempo',
  527: 'stx',
  528: 'custix',
  529: 'irc-serv',
  530: 'courier',
  531: 'conference',
  532: 'netnews',
  533: 'netwall',
  534: 'windream',
  535: 'iiop',
  536: 'opalis-rdv',
  537: 'nmsp',
  538: 'gdomap',
  539: 'apertus-ldp',
  540: 'uucp',
  541: 'uucp-rlogin',
  542: 'commerce',
  543: 'klogin',
  544: 'kshell',
  545: 'appleqtcsrvr',
  546: 'dhcpv6-client',
  547: 'dhcpv6-server',
  548: 'afpovertcp',
  549: 'idfp',
  550: 'new-rwho',
  551: 'cybercash',
  552: 'devshr-nts',
  553: 'pirp',
  554: 'rtsp',
  555: 'dsf',
  556: 'remotefs',
  557: 'openvms-sysipc',
  558: 'sdnskmp',
  559: 'teedtap',
  560: 'rmonitor',
  561: 'monitor',
  562: 'chshell',
  563: 'nntps',
  564: '9pfs',
  565: 'whoami',
  566: 'streettalk',
  567: 'banyan-rpc',
  568: 'ms-shuttle',
  569: 'ms-rome',
  570: 'meter',
  571: 'meter',
  572: 'sonar',
  573: 'banyan-vip',
  574: 'ftp-agent',
  575: 'vemmi',
  576: 'ipcd',
  577: 'vnas',
  578: 'ipdd',
  579: 'decbsrv',
  580: 'sntp-heartbeat',
  581: 'bdp',
  582: 'scc-security',
  583: 'philips-vc',
  584: 'keyserver',
  586: 'password-chg',
  587: 'submission',
  588: 'cal',
  589: 'eyelink',
  590: 'tns-cml',
  591: 'http-alt',
  592: 'eudora-set',
  593: 'http-rpc-epmap',
  594: 'tpip',
  595: 'cab-protocol',
  596: 'smsd',
  597: 'ptcnameservice',
  598: 'sco-websrvrmg3',
  599: 'acp',
  600: 'ipcserver',
  601: 'syslog-conn',
  602: 'xmlrpc-beep',
  603: 'idxp',
  604: 'tunnel',
  605: 'soap-beep',
  606: 'urm',
  607: 'nqs',
  608: 'sift-uft',
  609: 'npmp-trap',
  610: 'npmp-local',
  611: 'npmp-gui',
  612: 'hmmp-ind',
  613: 'hmmp-op',
  614: 'sshell',
  615: 'sco-inetmgr',
  616: 'sco-sysmgr',
  617: 'sco-dtmgr',
  618: 'dei-icda',
  619: 'compaq-evm',
  620: 'sco-websrvrmgr',
  621: 'escp-ip',
  622: 'collaborator',
  623: 'oob-ws-http',
  624: 'cryptoadmin',
  625: 'dec_dlm',
  626: 'asia',
  627: 'passgo-tivoli',
  628: 'qmqp',
  629: '3com-amp3',
  630: 'rda',
  631: 'ipp',
  632: 'bmpp',
  633: 'servstat',
  634: 'ginad',
  635: 'rlzdbase',
  636: 'ldaps',
  637: 'lanserver',
  638: 'mcns-sec',
  639: 'msdp',
  640: 'entrust-sps',
  641: 'repcmd',
  642: 'esro-emsdp',
  643: 'sanity',
  644: 'dwr',
  645: 'pssc',
  646: 'ldp',
  647: 'dhcp-failover',
  648: 'rrp',
  649: 'cadview-3d',
  650: 'obex',
  651: 'ieee-mms',
  652: 'hello-port',
  653: 'repscmd',
  654: 'aodv',
  655: 'tinc',
  656: 'spmp',
  657: 'rmc',
  658: 'tenfold',
  660: 'mac-srvr-admin',
  661: 'hap',
  662: 'pftp',
  663: 'purenoise',
  664: 'oob-ws-https',
  665: 'sun-dr',
  666: 'mdqs',
  667: 'disclose',
  668: 'mecomm',
  669: 'meregister',
  670: 'vacdsm-sws',
  671: 'vacdsm-app',
  672: 'vpps-qua',
  673: 'cimplex',
  674: 'acap',
  675: 'dctp',
  676: 'vpps-via',
  677: 'vpp',
  678: 'ggf-ncp',
  679: 'mrm',
  680: 'entrust-aaas',
  681: 'entrust-aams',
  682: 'xfr',
  683: 'corba-iiop',
  684: 'corba-iiop-ssl',
  685: 'mdc-portmapper',
  686: 'hcp-wismar',
  687: 'asipregistry',
  688: 'realm-rusd',
  689: 'nmap',
  690: 'vatp',
  691: 'msexch-routing',
  692: 'hyperwave-isp',
  693: 'connendp',
  694: 'ha-cluster',
  695: 'ieee-mms-ssl',
  696: 'rushd',
  697: 'uuidgen',
  698: 'olsr',
  699: 'accessnetwork',
  700: 'epp',
  701: 'lmp',
  702: 'iris-beep',
  704: 'elcsd',
  705: 'agentx',
  706: 'silc',
  707: 'borland-dsj',
  709: 'entrust-kmsh',
  710: 'entrust-ash',
  711: 'cisco-tdp',
  712: 'tbrpf',
  713: 'iris-xpc',
  714: 'iris-xpcs',
  715: 'iris-lwz',
  716: 'pana',
  729: 'netviewdm1',
  730: 'netviewdm2',
  731: 'netviewdm3',
  741: 'netgw',
  742: 'netrcs',
  744: 'flexlm',
  747: 'fujitsu-dev',
  748: 'ris-cm',
  749: 'kerberos-adm',
  750: 'rfile',
  751: 'pump',
  752: 'qrh',
  753: 'rrh',
  754: 'tell',
  758: 'nlogin',
  759: 'con',
  760: 'ns',
  761: 'rxe',
  762: 'quotad',
  763: 'cycleserv',
  764: 'omserv',
  765: 'webster',
  767: 'phonebook',
  769: 'vid',
  770: 'cadlock',
  771: 'rtip',
  772: 'cycleserv2',
  773: 'submit',
  774: 'rpasswd',
  775: 'entomb',
  776: 'wpages',
  777: 'multiling-http',
  780: 'wpgs',
  800: 'mdbs_daemon',
  801: 'device',
  810: 'fcp-udp',
  828: 'itm-mcell-s',
  829: 'pkix-3-ca-ra',
  830: 'netconf-ssh',
  831: 'netconf-beep',
  832: 'netconfsoaphttp',
  833: 'netconfsoapbeep',
  847: 'dhcp-failover2',
  848: 'gdoi',
  860: 'iscsi',
  861: 'owamp-control',
  862: 'twamp-control',
  873: 'rsync',
  886: 'iclcnet-locate',
  887: 'iclcnet_svinfo',
  888: 'accessbuilder',
  900: 'omginitialrefs',
  901: 'smpnameres',
  902: 'ideafarm-door',
  903: 'ideafarm-panic',
  910: 'kink',
  911: 'xact-backup',
  912: 'apex-mesh',
  913: 'apex-edge',
  989: 'ftps-data',
  990: 'ftps',
  991: 'nas',
  992: 'telnets',
  993: 'imaps',
  994: 'ircs',
  995: 'pop3s',
  996: 'vsinet',
  997: 'maitrd',
  998: 'busboy',
  999: 'garcon',
  1000: 'cadlock2',
  1010: 'surf',
  1021: 'exp1',
  1022: 'exp2'
};

/*
 * Helpers
 */

function getPort(service) {
  assert(typeof service === 'string');

  const port = services[service];

  if ((port & 0xffff) !== port)
    return 0;

  return port;
}

function getService(port) {
  assert((port & 0xffff) === port);
  return servicesByVal[port] || null;
}

function protocolToString(protocol) {
  return toSymbol(protocol, 'protocol', protocolsByVal, 'PROTOCOL', 0xff, 3);
}

function stringToProtocol(symbol) {
  return fromSymbol(symbol, 'protocol', protocols, 'PROTOCOL', 0xff, 3);
}

function isProtocolString(symbol) {
  return isSymbol(symbol, 'protocol', protocols, 'PROTOCOL', 0xff, 3);
}

/*
 * Expose
 */

iana.protocols = protocols;
iana.protocolsByVal = protocolsByVal;
iana.services = services;
iana.servicesByVal = servicesByVal;

iana.getPort = getPort;
iana.getService = getService;
iana.protocolToString = protocolToString;
iana.stringToProtocol = stringToProtocol;
iana.isProtocolString = isProtocolString;
