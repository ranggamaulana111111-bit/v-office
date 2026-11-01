<?php
namespace Database\Seeders;
use App\Models\{User,PtClient,PtInvoice,PtCashflow,Task,NextProject,DriveFile,PhotoAsset,SecretVaultItem,OfficeSetting,MonitoredDomain,PersonalWorkspace};
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class DatabaseSeeder extends Seeder {
    public function run(): void {
        User::firstOrCreate(['email'=>'owner@nexus.local'],['name'=>'Owner','password'=>Hash::make('nexus123')]);
        $c1=PtClient::create(['company_name'=>'PT Maju Jaya','npwp'=>'12.345.678.9-012.000','service_type'=>'FTTH Corporate']);
        $c2=PtClient::create(['company_name'=>'CV Teknologi Nusantara','npwp'=>'98.765.432.1-000.000','service_type'=>'Managed Service']);
        PtInvoice::create(['client_id'=>$c1->id,'invoice_number'=>'INV-001','subtotal'=>1000000,'ppn'=>110000,'pph'=>0,'total'=>1110000,'status'=>'PAID','due_date'=>now()->addDays(7)]);
        PtInvoice::create(['client_id'=>$c2->id,'invoice_number'=>'INV-002','subtotal'=>500000,'ppn'=>55000,'pph'=>0,'total'=>555000,'status'=>'OVERDUE','due_date'=>now()->subDays(3)]);
        PtCashflow::create(['type'=>'in','description'=>'Pembayaran INV-001','amount'=>1110000,'date'=>now()]);
        for($i=1;$i<=8;$i++){ Task::create(['title'=>"Tugas $i",'status'=>['todo','in_progress','review','done'][array_rand(['todo','in_progress','review','done'])],'priority'=>'medium']); }
        for($i=1;$i<=4;$i++){ NextProject::create(['name'=>"Proyek $i",'phase'=>'planning','budget'=>1000000*$i,'priority_score'=>$i,'readiness'=>rand(10,90),'specs'=>['note'=>'ide']]); }
        DriveFile::create(['name'=>'router-backup.rsc','folder'=>'/backup','path'=>'private-drive/router-backup.rsc','mime'=>'text/plain','size'=>1024]);
        PhotoAsset::create(['title'=>'Foto Lapangan','album'=>'lapangan','path'=>'private-photos/foto.jpg','thumbnail'=>'private-photos/thumb.webp']);
        SecretVaultItem::create(['title'=>'Root SSH','category'=>'ssh','ciphertext'=>'encrypted','iv'=>'iv','salt'=>'salt']);
        OfficeSetting::create(['key'=>'noc_url','value'=>'https://billing.alkonek.online/noc/dashboard']);
        OfficeSetting::create(['key'=>'ftth_url','value'=>'https://billing.alkonek.online/noc/features/map']);
        OfficeSetting::create(['key'=>'portofolio_url','value'=>'https://ranggamrw.my.id']);
        OfficeSetting::create(['key'=>'vault_pin','value'=>'1234']);
        MonitoredDomain::create(['domain'=>'example.com','http_status'=>200,'ping_ms'=>45,'ssl_days_left'=>30]);
        PersonalWorkspace::create(['journal'=>'Catatan awal','pomodoro_minutes'=>25]);
    }
}