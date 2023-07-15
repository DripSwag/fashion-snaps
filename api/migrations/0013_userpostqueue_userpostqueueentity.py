# Generated by Django 4.2.1 on 2023-07-15 08:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_user_password'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserPostQueue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
        migrations.CreateModel(
            name='UserPostQueueEntity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.post')),
                ('queue', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.userpostqueue')),
            ],
        ),
    ]