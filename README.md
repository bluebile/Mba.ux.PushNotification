# Mba.ux.PushNotification

Componente para registro e busca de dados dos devices no PushWoosh

## Dependências

Plugin do Cordova do PushWoosh
https://github.com/Pushwoosh/pushwoosh-phonegap-plugin

## Utilização
O plugin utiliza o mixin `Mba.ux.BuilderConfig.mixin.BuilderConfig` para incluir as configurações através dos `resources/global`

Adicionar no arquivo `cordova/config.xml` o plugin:

```xml
<plugin name="pushwoosh-cordova-plugin" spec="https://github.com/Pushwoosh/pushwoosh-phonegap-3.0-plugin.git#4.2.2" />
```

## Exemplos

#### Arquivo de configuração do plugin):

```javascript
//Criar o arquivo /resources/global/pushnotification.json

{
    "development": {
        "appId": "XXXXX-XXXXX",
        "projectId": "XXXXXXXXXXXX"
    },
    "staging": {
        "appId": "XXXXX-XXXXX",
        "projectId": "XXXXXXXXXXXX"
    },
    "production": {
        "appId": "XXXXX-XXXXX",
        "projectId": "XXXXXXXXXXXX"
    }

}
```

#### Exemplo (Utilização do plugin para cadastro do device no PushWoosh):

```javascript
//Realiza o registro no pushWoosh do device do usuário

var pushWoosh = Ext.create('Mba.ux.PushNotification');
   pushWoosh.register(function(tokenGeradoPeloPushwoosh){

       console.log(tokenGeradoPeloPushwoosh);

   }, function(error){

       console.log(error);
   });
```


