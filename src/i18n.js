import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        // Navibar
        Login: 'Login',
        Logout: 'Logout',
        Profile: 'Profile',
        // Sidebar
        Dashboard: 'Dashboard',
        Drivers: 'Drivers',
        Vehicles: 'Vehicles',
        Devices: 'Devices',
        Supervisors: 'Supervisors',
        supervisors: 'supervisors',
        // Dashboard
        'Drivers with the most Speeding Alerts': 'Drivers with the most Speeding Alerts',
        'Drivers with the most Hours of Driving Alerts': 'Drivers with the most Hours of Driving Alerts',
        Driver: 'Driver',
        Vehicle: 'Vehicle',
        Type: 'Type',
        'Amount of Excess Speed': 'Amount of Excess Speed',
        'Amount of Excess Hours of Driving': 'Amount of Excess Hours of Driving',
        Map: 'Map',
        'Duty Status Stats': 'Duty Status Stats',
        'Alerts Stats': 'Alerts Stats',
        'Accumulated Duty Status Hours Per Type': 'Accumulated Duty Status Hours Per Type',
        // Drivers, Vehicles and MotorCarriers
        Search: 'Search',
        'Create driver': 'Create driver',
        'Create multiple drivers': 'Create multiple drivers',
        'Create vehicle': 'Create vehicle',
        'Create multiple vehicles': 'Create multiple vehicles',
        'Create Supervisor': 'Create Supervisor',
        'Edit Supervisor': 'Edit Supervisor',
        'Create MotorCarrier': 'Create MotorCarrier',
        'Add Supervisor': 'Add Supervisor',
        'Create New Driver': 'Create New Driver',
        'Edit Driver': 'Edit Driver',
        Name: 'Nombre',
        'USDOT Number': 'USDOT Number',
        'Multiday basis used': 'Multiday basis used',
        'Register Supervisor': 'Register Supervisor',
        Email: 'Email',

        'First name': 'First name',
        'Last name': 'Last name',
        Password: 'Password',
        'Password confirmation': 'Password confirmation',
        'Show password': 'Show password',
        Image: 'Image',
        'Driver license number': 'Driver license number',
        'Licenses issuing state': 'Licenses issuing state',
        'Exempt driver configuration': 'Exempt driver configuration',
        'Time Zone Offset in UTC': 'Time Zone Offset in UTC',
        'Starting Time 24 Hour Period': 'Starting Time 24 Hour Period',
        'Move Yards Use': 'Move Yards Use',
        'Default Use': 'Default Use',
        'Personal Use': 'Personal Use',
        Submit: 'Submit',

        'VIN number': 'VIN number',
        'CMV Power Unit Number': 'CMV Power Unit Number',
        'Vehicle Model': 'Vehicle Model',
        'Car Maker': 'Car Maker',
        'Create New Vehicle': 'Create New Vehicle',
        'The templates below have the structure the file must have. You can download it, fill it and then upload it.':
        'The templates below have the structure the file must have. You can download it, fill it and then upload it.',
        'Create multiple': 'Create multiple',
        drivers: 'drivers',
        vehicles: 'vehicles',
        'through an Excel or CSV file': 'through an Excel or CSV file',
        Upload: 'Upload',
        Download: 'Download',

        Event: 'Event',
        'All Events': 'All Events',
        Detail: 'Detail',
        Timestamp: 'Timestamp',
        Username: 'Username',
        'Time interval': 'Time interval',
        hours: 'horas',
        Day: 'Day',
        Week: 'Week',
        Month: 'Month',
        'General Information': 'General Information',
        Heatmap: 'Heatmap',
        Plaque: 'Plaque',
        State: 'State',
        VIN: 'VIN',
        ELD: 'ELD',

        'This field is required': 'This field is required',
        'Not a valid email': 'Not a valid email',
        'Error invalid username or password': 'Error invalid username or password',
        'Input is not a valid email': 'Input is not a valid email',
        "Passwords don't match": "Passwords don't match",
        'Supervisor was created successfully': 'Supervisor was created successfully',
        'Error the supervisor could not be created': 'Error the supervisor could not be created',
        'Your file was empty. Please try again later.': 'Your file was empty. Please try again later.',
        'Your file was not valid. Please try again later.': 'Your file was not valid. Please try again later.',
        'We have created all the new': 'We have created all the new',
        'Sorry, there has been an error. Please try again later.': 'Sorry, there has been an error. Please try again later.',
        'First name must have between 2-30 characters': 'First name must have between 2-30 characters',
        'Last name must have between 2-30 characters': 'Last name must have between 2-30 characters',
        'Invalid file format': 'Invalid file format',
        'Must only contain numbers and letters (0-9/A-Z)': 'Must only contain numbers and letters (0-9/A-Z)',
        'Must have ≤ 20 characters': 'Must have ≤ 20 characters',
        'Not a valid state': 'Not a valid state',
        'We have created the new driver.': 'We have created the new driver.',
        'We have edited the driver.': 'We have edited the driver.',
        'Sorry, there has been an error with the image upload. Please try again later.': 'Sorry, there has been an error with the image upload. Please try again later.',
        'Name must be between 4-120 characters long': 'Name must be between 4-120 characters long',
        'USDOT number must be between 0-999,999,999': 'USDOT number must be between 0-999,999,999',
        'The Motor Carrier was created successfully': 'The Motor Carrier was created successfully',
        'Error the Motor Carrier could not be created': 'Error the Motor Carrier could not be created',
        'Must be 17 or 18 characters long': 'Must be 17 or 18 characters long',
        'Must start with a dash (-) if VIN is 18 char long': 'Must start with a dash (-) if VIN is 18 char long',
        'We have created the new vehicle.': 'We have created the new vehicle.',
        'We have edited the vehicle.': 'We have edited the vehicle.',
        'The driver was deleted successfully': 'The driver was deleted successfully',
        'Error the driver was not deleted': 'Error the driver was not deleted',
        'Are you sure you want to delete this driver?': 'Are you sure you want to delete this driver?',
        'The vehicle was deleted successfully': 'The vehicle was deleted successfully',
        'Error the vehicle was not deleted': 'Error the vehicle was not deleted',

        'Speeding Alerts by Day': 'Speeding Alerts by Day',
        'Hours of Driving Alerts by Day': 'Hours of Driving Alerts by Day',

        Activity: 'Activity',
        Alerts: 'Alerts',
        'Last 24 hours': 'Last 24 hours',
        Time: 'Time',

        Driving: 'Driving',
        'Sleeper Berth': 'Sleeper Berth',
        'Off-duty': 'Off-duty',
        'On-duty not driving': 'On-duty not driving',
        'Duty status': 'Duty status',
        'Intermediate log': 'Intermediate log',
        'Driver indication': 'Driver indication',
        'Daily record certification': 'Daily record certification',
        'ELD authentification activity': 'ELD authentification activity',
        Engine: 'Engine',
        'Malfunction or data diagnostic': 'Malfunction or data diagnostic',
        'Driver(s)': 'Conductores',
        New: 'New',
        'Vehicle(s)': 'Vehicle(s)',
        'new driver': 'new driver',
        'new vehicle': 'new vehicle',

        'OFF DUTTY': 'OFF DUTTY',
        'SLEEPER BERTH': 'SLEEPER BERTH',
        DRIVING: 'DRIVING',
        'ON DUTY NOT DRIVING': 'DRIVING',
        // trailers
        Trailers: 'Trailers',
        'Create New Trailer': 'Create New Trailer',
        'Edit Trailer': 'Edit Trailer',
        'Trailer Number': 'Trailer Number',
        'Trailer Model': 'Trailer Model',
        'Trailer Manufacturer': 'Trailer Manufacturer',
        Manufacturer: 'Manufacturer',
        Year: 'Year',
        'Gross vehicle weight': 'Gross vehicle weight',
        'Gross Vehicle Weight': 'Gross Vehicle Weight',
        'We have created the new trailer.': 'We have created the new trailer.',
        'We have edited the trailer.': 'We have edited the trailer.',
        'Invalid trailer year': 'Invalid trailer year',
        'new trailer': 'new trailer',
        trailers: 'trailers',
        'Serial Number': 'Serial Number',
        'Create trailer': 'Create trailer',
        edit: 'edit',
        'Trailer was deleted successfully': 'Trailer was deleted successfully',

        // Supervisors
        'We have created the new supervisor.': 'We have created the new supervisor.',
        'We have edited the supervisor.': 'We have edited the supervisor.',

        // Driver
        'Certify Events': 'Certify Events',
        'Assign Events': 'Assign Events',
        'No events to be certified': 'No events to be certified',
        'Yes': 'Yes',
        'I hereby certify that my data entries and my record of duty status for this 24-hour period are true and correct.':'I hereby certify that my data entries and my record of duty status for this 24-hour period are true and correct.',
        'Are you sure you want to assign this events to you?.': 'Are you sure you want to assign this events to you?.',
        'Certify My Logs': 'Certify My Logs',
      },
    },
    es: {
      translations: {
        // Navibar
        Login: 'Iniciar Sesión',
        Logout: 'Cerrar Sesión',
        Profile: 'Perfil',
        // Sidebar
        Dashboard: 'Panel',
        dashboard: 'Panel',
        Drivers: 'Conductores',
        drivers: 'Conductores',
        Vehicles: 'Vehículos',
        vehicles: 'Vehículos',
        Devices: 'Dispositivos',
        devices: 'Dispositivos',
        Supervisors: 'Supervisores',
        supervisors: 'supervisores',

        Administrator: 'Administrator',
        // Dashboard

        'Drivers with the most Speeding Alerts': 'Conductores con la mayor cantidad de Alertas de Exceso de Velocidad',
        'Drivers with the most Hours of Driving Alerts': 'Conductores con la mayor cantidad de Alertas de Horas de Conducción',
        Driver: 'Conductor',
        Vehicle: 'Vehículo',
        Type: 'Tipo',
        'Amount of Excess Speed': 'Cantidad de Excesos de Velocidad',
        'Amount of Excess Hours of Driving': 'Cantidad de Excesos de Horas Conduciendo',
        Map: 'Mapa',
        'Duty Status Stats': 'Estadísticas de Estado de Servicio',
        'Alerts Stats': 'Estadísticas de Alertas',
        'Accumulated Duty Status Hours Per Type': 'Horas Duty Status Por Tipo Acumuladas',
        // Conductores, vehículos y MotorCarriers
        Search: 'Buscar',
        'Create driver': 'Crear conductor',
        'Create multiple drivers': 'Crear multiples conductores',
        'Create vehicle': 'Crear vehiculo',
        'Create multiple vehicles': 'Crear multiples vehiculos',
        'Create Supervisor': 'Crear Supervisor',
        'Edit Supervisor': 'Editar Supervisor',
        'Create MotorCarrier': 'Crear Motor Carrier',
        'Add Supervisor': 'Agregar Supervisor',
        'Create New Driver': 'Crear Nuevo Conductor',
        'Edit Driver': 'Editar Conductor',
        Name: 'Nombre',
        'USDOT Number': 'Número USDOT',
        'Multiday basis used': 'Multiday basis usada',
        'Register Supervisor': 'Registrar Supervisor',
        Email: 'Correo electrónico',

        'First name': 'Nombre',
        'Last name': 'Apellido',
        Password: 'Contraseña',
        'Show password': 'Mostrar contraseña',
        'Password confirmation': 'Confirmar Contraseña',
        Image: 'Imagen',
        'Driver license number': 'Número de licencia',
        'Licenses issuing state': 'Estado emisor de licencia',
        'Exempt driver configuration': 'Configutación Conductor Eximido',
        'Time Zone Offset in UTC': 'Desfase zona horaria en UTC',
        'Starting Time 24 Hour Period': 'Hora inicial Periodo de 24 Horaas',
        'Move Yards Use': 'Uso Move Yards',
        'Default Use': 'Uso Default',
        'Personal Use': 'Uso Personal',
        Submit: 'Enviar',

        'VIN number': 'Número VIN',
        'CMV Power Unit Number': 'CMV Número Unidad de Poder',
        'Vehicle Model': 'Modelo Vehículo',
        'Car Maker': 'Productor de Auto',
        'Create New Vehicle': 'Crear Nuevo Vehículo',
        'The templates below have the structure the file must have. You can download it, fill it and then upload it.':
        'La plantilla contiene la estructura que debe seguir el archivo debe. Puede descargarla, completarla y luego cargarla.',
        'Create multiple': 'Crea múltiples',
        'through an Excel or CSV file': 'a través de un archivo Excel o CSV',
        Upload: 'Cargar archivo',
        Download: 'Descargar',

        Event: 'Evento',
        'All Events': 'Todos los Eventos',
        Detail: 'Detalle',
        Timestamp: 'Hora',
        Username: 'Nombre de usuario',
        'Time interval': 'Intervalo de tiempo',
        hours: 'horas',
        Day: 'Día',
        Week: 'Semana',
        Month: 'Mes',
        'General Information': 'Información General',
        Heatmap: 'Mapa de Calor',
        Plaque: 'Placa Patente',
        State: 'Estado',
        VIN: 'VIN',
        ELD: 'ELD',

        'This field is required': 'Este campo es requerido',
        'Not a valid email': 'Email no válido',
        'Error invalid username or password': 'Error nombre de usuario o contraseña no válido',
        'Input is not a valid email': 'Email no válido',
        "Passwords don't match": 'Contraseñas no coinciden',
        'Supervisor was created successfully': 'Supervisor fue creado exitosamente',
        'Error the supervisor could not be created': 'Error, el supervisor no pudo ser creado',
        'Your file was empty. Please try again later.': 'El archivo estaba vacío. Intente otra vez.',
        'Your file was not valid. Please try again later.': 'El archivo no es válido. Intente otra vez.',
        'We have created all the new': 'Hemos creado todos los nuevos',
        'Sorry, there has been an error. Please try again later.': 'Ha ocurrido un error. Intente otra vez.',
        'First name must have between 2-30 characters': 'El nombre debe tener entre 2 y 30 caracteres.',
        'Last name must have between 2-30 characters': 'El apellido debe tener entre 2 y 30 caracteres.',
        'Invalid file format': 'Formato Inválido',
        'Must only contain numbers and letters (0-9/A-Z)': 'Solo debe contener numeros y letras (0-9/A-Z)',
        'Must have ≤ 20 characters': 'Debe tener ≤ 20 caracateres',
        'Not a valid state': 'No es un estado válido',
        'We have created the new driver.': 'Hemos creado el nuevo conductor',
        'We have edited the driver.': 'Hemos editado el conductor',
        'Sorry, there has been an error with the image upload. Please try again later.': 'Ha ocurrido un error al intentar subir la imagen. Intente otra vez.',
        'Name must be between 4-120 characters long': 'El nombre debe tener de 4 a 120 caracteres de largo',
        'USDOT number must be between 0-999,999,999': 'USDOT debe estar entre 0 y 999,999,999',
        'The Motor Carrier was created successfully': 'El Motor Carrier fue creado exitosamente',
        'Error the Motor Carrier could not be created': 'Error, Motor Carrier no pudo ser creado',
        'Must be 17 or 18 characters long': 'Debe ser de 17 o 18 caracteres de largo',
        'Must start with a dash (-) if VIN is 18 char long': 'Debe iniciar con un guión (-) si el VIN es de 18 caracteres de largo',

        'We have created the new vehicle.': 'Hemos creado el nuevo vehículo',
        'We have edited the vehicle.': 'Editamos el vehículo',
        'The driver was deleted successfully': 'El conductor fue eliminado satisfactoriamente',
        'Error the driver was not deleted': 'Error el driver no fue eliminado',
        'Are you sure you want to delete this driver?': 'Está seguro que quiere eliminar este conductor?',
        'The vehicle was deleted successfully': 'El vehículo fue eliminado exitosamente',
        'Error the vehicle was not deleted': 'Error, el vehículo no fue eliminado',

        'Speeding Alerts by Day': 'Alertas de Exceso de Velocidad por Día',
        'Hours of Driving Alerts by Day': 'Alertas de Hora de Conducción por Día',

        Activity: 'Actividad',
        Alerts: 'Alertas',
        'Last 24 hours': 'Últimas 24 horas',
        Time: 'Hora',

        Driving: 'Conduciendo',
        'Sleeper Berth': 'Descansando en Litera',
        'Off-duty': 'Fuera de servicio',
        'On-duty not driving': 'En servicio - No conduciendo',
        'Duty status': 'Estado de Conducción',
        'Intermediate log': 'Log intermedio',
        'Driver indication': 'Indicación al conductor',
        'Daily record certification': 'Certificación diaria',
        'ELD authentification activity': 'Actividad de autentificación de ELD',
        Engine: 'Motor',
        'Malfunction or data diagnostic': 'Malfuncionamiento o diagnóstico de datos',
        'Driver(s)': 'Conductores',
        New: 'Nuevos',
        'Vehicle(s)': 'Vehículos',
        'new driver': 'nuevo conductor',
        'new vehicle': 'nuevo vehículo',

        'OFF DUTTY': 'FUERA DE SERVICIO',
        'SLEEPER BERTH': 'DESCANSANDO EN LITERA',
        DRIVING: 'CONDUCIENDO',
        'ON DUTY NOT DRIVING': 'EN SERVICIO - NO CONDUCIENDO',

        // trailers
        Trailers: 'Tráilers',
        'Create New Trailer': 'Crear Nuevo Tráiler',
        'Edit Trailer': 'Editar Tráiler',
        'Trailer Number': 'Número de Tráiler',
        'Trailer Model': 'Modelo de Tráiler',
        'Trailer Manufacturer': 'Fabricante del Tráiler',
        Manufacturer: 'Fabricante',
        Year: 'Año',
        'Gross vehicle weight': 'Peso bruto del vehículo',
        'Gross Vehicle Weight': 'Peso bruto del vehículo',
        'We have created the new trailer.': 'Hemos creado el nuevo tráiler.',
        'We have edited the trailer.': 'Hemos editado el tráiler.',
        'Invalid trailer year': 'Año de tráiler inválido',
        'new trailer': 'nuevo tráiler',
        trailers: 'tráilers',
        'Serial Number': 'Número de serie',
        'Create trailer': 'Crear tráiler',
        edit: 'editar',
        'Trailer was deleted successfully': 'El tráiler fue eliminado satisfactoriamente',

        // Supervisors
        'We have created the new supervisor.': 'Hemos creado al nuevo supervisor.',
        'We have edited the supervisor.': 'Hemos editado al supervisor.',

        'Certify Events': 'Certicar Eventos',
        'Assign Events': 'Asignar Eventos',
        'No events to be certified': 'No hay eventos que certificar',
        'Yes': 'Si',
        'I hereby certify that my data entries and my record of duty status for this 24-hour period are true and correct.': 'Por este medio, certifico que mis entradas de datos y mi registro de estado de servicio para este período de 24 horas son verdaderos y correctos.',
        'Are you sure you want to assign this events to you?.': 'Estas seguro que deseas asignarte estos eventos?',
        'Certify My Logs': 'Certificar Mis Logs',
      },
    },
  },
  fallbackLng: 'en',
  debug: true,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
  },

  react: { wait: true },
});

export default i18n;
