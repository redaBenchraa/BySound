; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

#define MyAppName "BySound"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "BySound, Inc."
#define MyAppExeName "BySound.exe"

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{917DDD30-2AC3-4594-801F-BEA0E675A673}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
;AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={pf}\{#MyAppName}
DefaultGroupName={#MyAppName}
AllowNoIcons=yes
LicenseFile=D:\Projects\Electron\BySound\dist\app-win32-ia32\LICENSE
OutputDir=D:\Projects\Electron\BySound\dist
OutputBaseFilename=BySound-Setup
SetupIconFile=D:\Projects\Electron\BySound\icon.ico
Compression=lzma
SolidCompression=yes

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked; OnlyBelowVersion: 0,6.1

[Files]
Source: "D:\Projects\Electron\BySound\dist\app-win32-ia32\BySound.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Projects\Electron\BySound\dist\app-win32-ia32\blink_image_resources_200_percent.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Projects\Electron\BySound\dist\app-win32-ia32\content_resources_200_percent.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Projects\Electron\BySound\dist\app-win32-ia32\content_shell.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Projects\Electron\BySound\dist\app-win32-ia32\d3dcompiler_47.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Projects\Electron\BySound\dist\app-win32-ia32\ffmpeg.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Projects\Electron\BySound\dist\app-win32-ia32\icudtl.dat"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Projects\Electron\BySound\dist\app-win32-ia32\libEGL.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Projects\Electron\BySound\dist\app-win32-ia32\libGLESv2.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Projects\Electron\BySound\dist\app-win32-ia32\LICENSE"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Projects\Electron\BySound\dist\app-win32-ia32\natives_blob.bin"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Projects\Electron\BySound\dist\app-win32-ia32\node.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Projects\Electron\BySound\dist\app-win32-ia32\snapshot_blob.bin"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Projects\Electron\BySound\dist\app-win32-ia32\ui_resources_200_percent.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Projects\Electron\BySound\dist\app-win32-ia32\version"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Projects\Electron\BySound\dist\app-win32-ia32\views_resources_200_percent.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Projects\Electron\BySound\dist\app-win32-ia32\xinput1_3.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Projects\Electron\BySound\dist\app-win32-ia32\resources\*"; DestDir: "{app}\resources"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "D:\Projects\Electron\BySound\dist\app-win32-ia32\locales\*"; DestDir: "{app}\locales"; Flags: ignoreversion recursesubdirs createallsubdirs
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{group}\{cm:UninstallProgram,{#MyAppName}}"; Filename: "{uninstallexe}"
Name: "{commondesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: quicklaunchicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

