import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JSEncrypt } from 'jsencrypt';

@Injectable({
  providedIn: 'root'
})
export class SingletonService {
  private static readonly DEVELOPMENT_API_URL = 'https://localhost:44358/api/';
  private static readonly PRODUCTION_API_URL = 'http://zapillo:8000/api/';
  private static readonly TEST_API_URL = 'http://localhost:3000/posts';
  private static readonly API_URL = SingletonService.DEVELOPMENT_API_URL;
  public static readonly ESQUEMA = [
    
    {
      name: 'gestion',
      title: 'Gestión',
      submenus: [
        { name: 'clientes', title: 'Clientes', description: 'CRM y Contratos', icon: 16 },// link
        { name: 'ordenes', title: 'Órdenes', description: 'Tareas y Atenciones', icon: 30 },
        { name: 'telefonia', title: 'Telefonía', description: 'Numeración Fija y Móvil', icon: 24 },
        { name: 'ingenieria', title: 'Ingeniería', description: 'Zonas y Estados', icon: 17 },
        { name: 'crmsuite', title: 'CRM Suite', description: 'Datos de Clientes', icon: 16 }
      ]
    },
    {
      name: 'facturacion',
      title: 'Facturación',
      submenus: [
        { name: 'servicios', title: 'Servicios', description: 'Parámetros y Precios', icon: 31 },
        { name: 'consumolince', title: 'Consumos', description: 'Tarificación y Bonos', icon: 33 },      
        { name: 'prefacturalince', title: 'Generación', description: 'Remesa y Transferencias', icon: 27 },
        { name: 'prefactura', title: 'Registro', description: 'Facturas Mensuales y Diarias', icon: 28 },
        { name: 'facturassuitetest', title: 'Test Facturas Suite', description: 'Historial y Totales', icon: 31 }
     //   { name: 'integración', title: 'Integraciones', description: 'Resumenes y Cierres', icon: 27 }
       
       
      ]
    },
  
    {
      name: 'ingresos',
      title: 'Ingresos',
      submenus: [
        { name: 'principales', title: 'Principales', description: 'Domiciliaciones y transferencias', icon: 0 },
        { name: 'ventas', title: 'Ventas', description: 'Directas y Financiaciones', icon: 1 },
        { name: 'adicionales', title: 'Adicionales', description: 'Recargos y Ad hoc', icon: 2 },
        { name: 'rectificativas', title: 'Rectificativas', description: 'Abonos y Compensaciones', icon: 3 },
        { name: 'facturassuite', title: 'Facturas Ingresos Suite', description: 'Todas las Naturalezas', icon: 0 }
      ]
    },
    {
      name: 'impagos',
      title: 'Impagos',
      submenus: [
        { name: 'devoluciones', title: 'Devoluciones', description: 'Recibos y Rechazos', icon: 8 },
        { name: 'acuerdos', title: 'Acuerdos', description: 'Aplazamientos y Vencimientos', icon: 7 },
        { name: 'suspensiones', title: 'Suspensiones', description: 'Órdenes y Reconexiones', icon: 10 },
        { name: 'cortes', title: 'Cortes', description: 'por Impago y Bajas Voluntarias', icon: 11 },
        { name: 'impagossuite', title: 'Impagos Suite', description: 'Devoluciones y Rechazos', icon: 8 }
      ]
    },
    {
      name: 'cobros',
      title: 'Cobros',
      submenus: [
        { name: 'cajero', title: 'Cajero', description: 'Intradías y Diarios', icon: 4 },
        { name: 'transferencias', title: 'Transferencias', description: 'Principales y Ad hoc', icon: 29 },
        { name: 'tpv', title: 'TPV', description: 'Metálico, Tarjeta y Web', icon: 6 },
        { name: 'fraccionamientos', title: 'Fraccionamientos', description: 'Facturas y Cuotas', icon: 9 },
        { name: 'cobrossuite', title: 'Cobros Suite', description: 'Recibos y Estados', icon: 4 }
      ]
    },
    {
      name: 'pagos',
      title: 'Pagos',
      submenus: [
        { name: 'proveedores', title: 'Proveedores', description: 'Pagos y Provisiones', icon: 12 },
        { name: 'pedidos', title: 'Pedidos', description: 'Registro y Localización', icon: 13 },
        { name: 'reintegros', title: 'Reintegros', description: 'Abonos y Calidad', icon: 15 },
        { name: 'comisiones', title: 'Comisiones', description: 'Empleados y Operaciones', icon: 14 },
        { name: 'pagossuite', title: 'Pagos Suite', description: 'Remesas negativas', icon: 14 }
      ]
    },
    
   /* {
      name: 'consultas',
      title: 'Consultas',
      submenus: [
        { name: 'clientes', title: 'Clientes', description: 'ATC y Comercial'},
        { name: 'telefonia', title: 'Telefonía', description: 'Fija y Móvil'},
        { name: 'comunicaciones', title: 'Comunicaciones', description: 'Órdenes y Atenciones'},
        { name: 'enlaces', title: 'Enlaces', description: 'Internos y Links'}
      ]
    },*/
    {
      name: 'logistica',
      title: 'Logística',
      submenus: [       
        { name: 'almacen', title: 'Almacén', description: 'Existencias y Costes', icon: 25 }, 
        { name: 'articulos', title: 'Articulos', description: 'Cuotas y Precios', icon: 26 },              
       { name: 'tiendas', title: 'Tiendas', description: 'Ventas y Cobros', icon: 32 },
        { name: 'movimientos', title: 'Movmientos', description: 'Entradas y Salidas', icon: 5 },
        { name: 'logisticasuite', title: 'Log. Suite', description: 'Movimientos Logísticos', icon: 25 }
      ]
    },
    {
      name: 'informes',
      title: 'Informes',
      submenus: [
        { name: 'documentos', title: 'Documentos', description: 'Archivos de Gestión', icon: 20 },
        { name: 'indicadores', title: 'Indicadores', description: 'Cuadro de Mando', icon: 21 },
        { name: 'facturacion', title: 'Facturación', description: 'Unidad Administrativa', icon: 18 },
        { name: 'economicos', title: 'Económicos', description: 'Contable y Financiero', icon: 19 },
        { name: 'reportsuite', title: 'Report Suite', description: 'Indicadores y listados Suite', icon: 20 }
      ]
    }
  ];
  sub$ = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) { }

  public getData(url: string): Observable<any> {
    // SingletonService.API_URL + url
    console.log(SingletonService.API_URL + url);
    return this.http.get<any>(SingletonService.API_URL + url).pipe(
      catchError(this.HttpErrorHandler)
    );
  }

  public postData(url: string, data: any, headers?: any): Observable<any> {
    return this.http.post<any>(SingletonService.API_URL + url, data, headers).pipe(
      map(this.extractData),
      catchError(this.HttpErrorHandler)
    );
  }

  public putData(url: string, data: any): Observable<any> {
    return this.http.put<any>(SingletonService.API_URL + url, data).pipe(
      map(this.extractData),
      catchError(this.HttpErrorHandler)
    );
  }

  public deleteData(url: string): Observable<Array<object>> {
    return this.http.delete<object>(SingletonService.API_URL + url).pipe(
      map(this.extractData),
      catchError(this.HttpErrorHandler)
    );
  }

  private HttpErrorHandler(error: HttpErrorResponse): Observable<never> {
    return throwError(('Error: ' + error.message) || 'Error del servidor');
  }

  // MAPEO
  private extractData(response: any) {
    let arrayRes: Array<any>;
    arrayRes = Array.of(response);
    return arrayRes[0];
  }


  // LOGIN
  login(pusername: string, password: string) {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const ENCRYPT = new JSEncrypt({default_key_size: '2048'});
   //ENCRYPT.default_key_size = 2048;
    const PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----\
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmLnneQnkGfMo9gGrHwuj\
    NwmiLUf5qZJNYxqObMrCS96efDLdudBmg/IgmxYi/Cwcp3tcQh1G4AKVl+pXNu04\
    fzmTwuXfDdrKtm1He1v7quQtUmZ1fuLLSnw1g2TXDkpsXYP9y5PWWoJx/+cd62A/\
    hFrtxBT5SZbmylwXDyddroH0Z5Tv1gfTUslnv3B9oanGaEyA1mjHdzLHBB4QLT0a\
    py/aXtBvMOIQaMkpYi4FCL9ZPkQRg91mFQLYPPDv/Kkvwbc19T7ZTDpCjC/PLmy8\
    7S7kJ16D7LjqhR0uwRnfDSM47RgQqT7syiG4cvrL8MxMr7BnLqpHIRu6rnTuNXRJ\
    xQIDAQAB\
    -----END PUBLIC KEY-----';
    ENCRYPT.setPublicKey(PUBLIC_KEY);

    const promise = new Promise((resolve, reject) => {
      this.http.post(
        'http://costacabana:2000/token',
        'grant_type=password&username=' + pusername + '&password=' + ENCRYPT.encrypt(password),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      ).subscribe(
        res => {
          const A = JSON.parse(JSON.stringify(res));
          localStorage.setItem('currentUser', JSON.stringify(res));
          localStorage.setItem('access_token', A.access_token);
         
         
          localStorage.setItem('username', pusername);
          console.log(res);
          resolve(res);
        },
        err => {
          console.log('Error occured');
          reject(err);
        }
      );
    });
    this.checkUser();

    return promise;
  }

  login2(username: string, password: string,){
    let jsEncrypt = new JSEncrypt({default_key_size: '2048'});
    //jsEncrypt.default_key_size = 2048;
    const PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----\
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmLnneQnkGfMo9gGrHwuj\
    NwmiLUf5qZJNYxqObMrCS96efDLdudBmg/IgmxYi/Cwcp3tcQh1G4AKVl+pXNu04\
    fzmTwuXfDdrKtm1He1v7quQtUmZ1fuLLSnw1g2TXDkpsXYP9y5PWWoJx/+cd62A/\
    hFrtxBT5SZbmylwXDyddroH0Z5Tv1gfTUslnv3B9oanGaEyA1mjHdzLHBB4QLT0a\
    py/aXtBvMOIQaMkpYi4FCL9ZPkQRg91mFQLYPPDv/Kkvwbc19T7ZTDpCjC/PLmy8\
    7S7kJ16D7LjqhR0uwRnfDSM47RgQqT7syiG4cvrL8MxMr7BnLqpHIRu6rnTuNXRJ\
    xQIDAQAB\
    -----END PUBLIC KEY-----';
    jsEncrypt.setPublicKey(PUBLIC_KEY);

    return this.http.post(
      SingletonService.API_URL + 'login/checklogin',
      'username=' + username + '&password=' + jsEncrypt.encrypt(password) + '&p2=' + password,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
  }

  /**
   * Efectúa logout del usuario y devuelve a página de login
   */
  logout() {
    localStorage.removeItem('tk');
    this.checkUser();
  }
  /**
   * Devuelve usuario logeado
   */
  getUser(): any {
    if (sessionStorage.getItem('user') !== null) {
      return JSON.parse(sessionStorage.getItem('user') || '');
    } else {
      return undefined;
    }
  }

  
  /**
   * Indica si el usuario está logeado o no
   */
  isLoggedIn(): boolean {
      return this.getUser() !== null;
  }

  isLogged(): Observable<any> {
    return this.sub$.asObservable();
  }

  checkUser() {
    this.sub$.next(localStorage.getItem('tk') !== null);
  }

  getUserSuite(): any {
    if (localStorage.getItem('ls.authorizationData') !== null) {
      return JSON.parse(localStorage.getItem('ls.authorizationData') || '');
    } else {
      return undefined;
    }
}

  public pad(num: number, size: number): string {
    let s = num.toString();

    while (s.length < size) {
      s = '0' + s;
    }

    return s;
  }


}
