
 import  EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

 import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
 import IMailProvider from './MailProvider/models/IMailProvider';

 import  HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarMailTemplateProvider';



 import {container} from 'tsyringe';
import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';


container.registerSingleton<IStorageProvider>(

    'StorageProvider',
    DiskStorageProvider,
);




container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider,

);

container.registerInstance<IMailProvider>(

    'MailProvider',
    container.resolve (EtherealMailProvider),
);

